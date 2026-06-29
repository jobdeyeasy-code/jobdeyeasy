'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import styles from './onboarding.module.css'

type SurveyData = {
  fullName: string
  phone: string
  location: string
  jobTitles: string
  workType: string
  salaryMin: string
  salaryMax: string
  education: string
  fieldOfStudy: string
  graduationYear: string
  jobs: { title: string; company: string; startYear: string; endYear: string; duties: string }[]
  skills: string
  certifications: string
  languages: string
  hiddenSkills: string
  careerGoal: string
  whyHire: string
}

const empty: SurveyData = {
  fullName: '', phone: '', location: '', jobTitles: '', workType: 'any',
  salaryMin: '', salaryMax: '', education: '', fieldOfStudy: '', graduationYear: '',
  jobs: [{ title: '', company: '', startYear: '', endYear: '', duties: '' }],
  skills: '', certifications: '', languages: '', hiddenSkills: '', careerGoal: '', whyHire: '',
}

const surveySteps = [
  { id: 'personal', title: 'Personal details', subtitle: 'This is how employers will contact you.' },
  { id: 'jobPrefs', title: 'What kind of job are you looking for?', subtitle: 'Be as specific as you can — this helps us match you to the right roles.' },
  { id: 'education', title: 'Your education', subtitle: 'Tell us about your highest level of education.' },
  { id: 'experience', title: 'Your work experience', subtitle: 'Tell us about the jobs you\'ve had. If you\'ve never worked before, that\'s okay — just skip to the next step.' },
  { id: 'skills', title: 'Your skills & strengths', subtitle: 'List everything you\'re good at — software, tools, languages, people skills. Don\'t be modest.' },
  { id: 'extras', title: 'The things that make you stand out', subtitle: 'This is the most important section. Think carefully.' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [hasCV, setHasCV] = useState<boolean | null>(null)
  const [surveyStep, setSurveyStep] = useState(0)
  const [data, setData] = useState<SurveyData>(empty)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [done, setDone] = useState(false)

  function set(field: keyof SurveyData, value: string) {
    setData(prev => ({ ...prev, [field]: value }))
  }
  function setJob(i: number, field: string, value: string) {
    const jobs = [...data.jobs]
    jobs[i] = { ...jobs[i], [field]: value }
    setData(prev => ({ ...prev, jobs }))
  }
  function addJob() {
    setData(prev => ({ ...prev, jobs: [...prev.jobs, { title: '', company: '', startYear: '', endYear: '', duties: '' }] }))
  }

  async function handleSubmit() {
    setLoading(true)
    setSaveError('')
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        setSaveError('Your session has expired. Please go back to /login and sign in again.')
        setLoading(false)
        return
      }

      const { error: materialsError } = await supabase.from('client_materials').insert({
        user_id: user.id,
        built_from_survey: hasCV === false,
        survey_responses: hasCV === false ? data : null,
        hidden_skills_notes: data.hiddenSkills,
      })
      if (materialsError) {
        setSaveError(`Could not save your profile: ${materialsError.message}`)
        setLoading(false)
        return
      }

      const { error: profileError } = await supabase.from('profiles').update({
        phone_whatsapp: data.phone,
        preferred_location: data.location,
        preferred_job_titles: data.jobTitles ? data.jobTitles.split(',').map(s => s.trim()).filter(Boolean) : [],
        preferred_salary_min: data.salaryMin ? parseInt(data.salaryMin) : null,
        preferred_salary_max: data.salaryMax ? parseInt(data.salaryMax) : null,
        preferred_work_type: (data.workType || 'any') as 'remote' | 'hybrid' | 'onsite' | 'any',
      }).eq('id', user.id)
      if (profileError) {
        setSaveError(`Could not update your profile: ${profileError.message}`)
        setLoading(false)
        return
      }

      setDone(true)
    } catch (err) {
      setSaveError(`Unexpected error: ${err instanceof Error ? err.message : 'Please try again.'}`)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className={styles.page}>
        <div className={styles.doneCard}>
          <div className={styles.doneIcon}>🎉</div>
          <h1>You&apos;re all set!</h1>
          <p>We have everything we need to get started. Our team will review your profile and reach out within 24 hours with your first matched jobs.</p>
          <p className={styles.doneSub}>Check your email and WhatsApp — we&apos;ll be in touch soon.</p>
          <button className={styles.btnPrimary} onClick={() => router.push('/dashboard')}>
            Go to my dashboard →
          </button>
        </div>
      </div>
    )
  }

  // STEP 0 — Do you have a CV?
  if (hasCV === null) {
    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <span className={styles.logo}><span className={styles.green}>Job</span><span className={styles.gold}>Dey</span><span className={styles.green}>Easy</span></span>
          <span className={styles.stepIndicator}>Getting started</span>
        </div>
        <div className={styles.container}>
          <div className={styles.stepHeader}>
            <div className={styles.welcomeIcon}>👋</div>
            <h1>Welcome to JobDeyEasy!</h1>
            <p>Let&apos;s get your profile set up so we can start finding jobs that fit you. First question:</p>
          </div>
          <div className={styles.choiceGrid}>
            <button className={styles.choiceCard} onClick={() => setHasCV(true)}>
              <span className={styles.choiceIcon}>📄</span>
              <h3>Yes, I have a CV</h3>
              <p>I&apos;ll upload my existing CV and you can work from that.</p>
              <span className={styles.choiceArrow}>→</span>
            </button>
            <button className={styles.choiceCard} onClick={() => setHasCV(false)}>
              <span className={styles.choiceIcon}>✍️</span>
              <h3>No, I don&apos;t have a CV</h3>
              <p>No problem — we&apos;ll build one from scratch. Just answer a few questions.</p>
              <span className={styles.choiceArrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Has CV — upload flow
  if (hasCV === true) {
    return (
      <div className={styles.page}>
        <div className={styles.topBar}>
          <span className={styles.logo}><span className={styles.green}>Job</span><span className={styles.gold}>Dey</span><span className={styles.green}>Easy</span></span>
          <span className={styles.stepIndicator}>Upload your CV</span>
        </div>
        <div className={styles.container}>
          <div className={styles.stepHeader}>
            <h1>Upload your CV</h1>
            <p>We&apos;ll use this as the base and tailor it for every job we apply to on your behalf.</p>
          </div>
          <div className={styles.uploadCard}>
            <div className={styles.uploadArea} onClick={() => document.getElementById('cv-upload')?.click()}>
              <span className={styles.uploadIcon}>📎</span>
              <h3>{cvFile ? cvFile.name : 'Click to upload your CV'}</h3>
              <p>{cvFile ? `${(cvFile.size / 1024).toFixed(0)} KB — ready to upload` : 'PDF, Word (.docx), or Google Docs export accepted. Max 5MB.'}</p>
              <input id="cv-upload" type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={e => e.target.files && setCvFile(e.target.files[0])} />
            </div>
            {cvFile && (
              <div className={styles.uploadConfirm}>
                <span>✅</span> <span>{cvFile.name} selected</span>
                <button onClick={() => setCvFile(null)}>Remove</button>
              </div>
            )}

            <div className={styles.divider}>Also tell us a bit about what you&apos;re looking for</div>

            <div className={styles.quickFields}>
              <div className={styles.field}>
                <label>Your WhatsApp number</label>
                <input type="tel" placeholder="+234 800 000 0000" value={data.phone} onChange={e => set('phone', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Job titles you&apos;re targeting</label>
                <input type="text" placeholder="e.g. Data Analyst, Marketing Executive" value={data.jobTitles} onChange={e => set('jobTitles', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Preferred work type</label>
                <select value={data.workType} onChange={e => set('workType', e.target.value)}>
                  <option value="any">Any</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">Onsite</option>
                </select>
              </div>
              <div className={styles.field}>
                <label>Location preference</label>
                <input type="text" placeholder="e.g. Lagos, Abuja, Open to anywhere" value={data.location} onChange={e => set('location', e.target.value)} />
              </div>
              <div className={styles.fieldFull}>
                <label>Is there anything you&apos;re good at that&apos;s not on your CV? (optional but very helpful)</label>
                <textarea rows={3} placeholder="e.g. I manage a WhatsApp business group of 2,000 people. I trained junior staff informally for 6 months. I speak Yoruba fluently..." value={data.hiddenSkills} onChange={e => set('hiddenSkills', e.target.value)} />
                <span className={styles.fieldHint}>This helps us write a stronger application. Be honest — even small things count.</span>
              </div>
            </div>

            <button className={styles.btnPrimary} onClick={handleSubmit} disabled={!cvFile || loading}>
              {loading ? 'Saving...' : 'Submit and continue →'}
            </button>
            {saveError && <div className={styles.saveError}>{saveError}</div>}
            <button className={styles.backBtn} onClick={() => setHasCV(null)}>← Back</button>
          </div>
        </div>
      </div>
    )
  }

  // No CV — guided survey
  const currentStep = surveySteps[surveyStep]
  const progress = ((surveyStep + 1) / surveySteps.length) * 100

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <span className={styles.logo}><span className={styles.green}>Job</span><span className={styles.gold}>Dey</span><span className={styles.green}>Easy</span></span>
        <span className={styles.stepIndicator}>Step {surveyStep + 1} of {surveySteps.length}</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.container}>
        <div className={styles.stepHeader}>
          <div className={styles.stepNum}>Step {surveyStep + 1} of {surveySteps.length}</div>
          <h1>{currentStep.title}</h1>
          <p>{currentStep.subtitle}</p>
        </div>

        <div className={styles.surveyCard}>
          {/* PERSONAL */}
          {currentStep.id === 'personal' && (
            <div className={styles.fields}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Full name <span className={styles.req}>*</span></label>
                  <input type="text" placeholder="Ada Okonkwo" value={data.fullName} onChange={e => set('fullName', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>WhatsApp number <span className={styles.req}>*</span></label>
                  <input type="tel" placeholder="+234 800 000 0000" value={data.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div className={styles.field}>
                <label>City / State <span className={styles.req}>*</span></label>
                <input type="text" placeholder="e.g. Lagos, Abuja, Port Harcourt" value={data.location} onChange={e => set('location', e.target.value)} />
              </div>
            </div>
          )}

          {/* JOB PREFERENCES */}
          {currentStep.id === 'jobPrefs' && (
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>What job titles are you looking for? <span className={styles.req}>*</span></label>
                <input type="text" placeholder="e.g. Customer Service, Data Analyst, Sales Executive" value={data.jobTitles} onChange={e => set('jobTitles', e.target.value)} />
                <span className={styles.fieldHint}>You can list more than one, separated by commas.</span>
              </div>
              <div className={styles.field}>
                <label>Work type preference</label>
                <select value={data.workType} onChange={e => set('workType', e.target.value)}>
                  <option value="any">I&apos;m open to anything</option>
                  <option value="remote">Remote only</option>
                  <option value="hybrid">Hybrid (some days in office)</option>
                  <option value="onsite">Onsite / in-office</option>
                </select>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Minimum salary you&apos;d accept (₦/month)</label>
                  <input type="number" placeholder="e.g. 150000" value={data.salaryMin} onChange={e => set('salaryMin', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Ideal salary (₦/month)</label>
                  <input type="number" placeholder="e.g. 300000" value={data.salaryMax} onChange={e => set('salaryMax', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {currentStep.id === 'education' && (
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Highest level of education <span className={styles.req}>*</span></label>
                <select value={data.education} onChange={e => set('education', e.target.value)}>
                  <option value="">Select one</option>
                  <option>SSCE / WAEC / NECO</option>
                  <option>OND (Ordinary National Diploma)</option>
                  <option>HND (Higher National Diploma)</option>
                  <option>Bachelor&apos;s Degree (B.Sc / B.A / B.Eng)</option>
                  <option>Postgraduate Diploma (PGD)</option>
                  <option>Master&apos;s Degree (M.Sc / MBA / M.A)</option>
                  <option>PhD / Doctorate</option>
                  <option>Professional Certification only</option>
                  <option>No formal education</option>
                </select>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label>Field of study / course</label>
                  <input type="text" placeholder="e.g. Business Administration, Computer Science" value={data.fieldOfStudy} onChange={e => set('fieldOfStudy', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Year of graduation</label>
                  <input type="text" placeholder="e.g. 2021" value={data.graduationYear} onChange={e => set('graduationYear', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {currentStep.id === 'experience' && (
            <div className={styles.fields}>
              <p className={styles.sectionNote}>Add your work experience below, starting with your most recent job. Never worked before? Leave this blank and click Next.</p>
              {data.jobs.map((job, i) => (
                <div key={i} className={styles.jobBlock}>
                  <div className={styles.jobBlockTitle}>Job {i + 1}</div>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label>Job title</label>
                      <input type="text" placeholder="e.g. Customer Service Rep" value={job.title} onChange={e => setJob(i, 'title', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>Company / Organisation</label>
                      <input type="text" placeholder="e.g. MTN Nigeria" value={job.company} onChange={e => setJob(i, 'company', e.target.value)} />
                    </div>
                  </div>
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label>Start year</label>
                      <input type="text" placeholder="e.g. 2020" value={job.startYear} onChange={e => setJob(i, 'startYear', e.target.value)} />
                    </div>
                    <div className={styles.field}>
                      <label>End year (or &quot;Present&quot;)</label>
                      <input type="text" placeholder="e.g. 2023 or Present" value={job.endYear} onChange={e => setJob(i, 'endYear', e.target.value)} />
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>What did you do in this role? What were your main responsibilities?</label>
                    <textarea rows={4} placeholder="e.g. I handled customer complaints by phone and email, resolved over 50 cases per week, trained 3 new team members, and consistently hit my monthly targets." value={job.duties} onChange={e => setJob(i, 'duties', e.target.value)} />
                    <span className={styles.fieldHint}>Be as specific as you can — numbers and examples make a much stronger CV.</span>
                  </div>
                </div>
              ))}
              <button className={styles.addJobBtn} onClick={addJob}>+ Add another job</button>
            </div>
          )}

          {/* SKILLS */}
          {currentStep.id === 'skills' && (
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>List your skills <span className={styles.req}>*</span></label>
                <textarea rows={4} placeholder="e.g. Microsoft Excel, Customer service, Data analysis, Social media management, QuickBooks, Canva, Public speaking, Team leadership..." value={data.skills} onChange={e => set('skills', e.target.value)} />
                <span className={styles.fieldHint}>Separate each skill with a comma. List everything you can do — soft skills count too.</span>
              </div>
              <div className={styles.field}>
                <label>Certifications or courses completed (optional)</label>
                <textarea rows={3} placeholder="e.g. Google Digital Marketing Certificate (2023), NIIT Data Analysis Course (2022), First Aid Certificate..." value={data.certifications} onChange={e => set('certifications', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Languages you speak</label>
                <input type="text" placeholder="e.g. English (fluent), Yoruba (native), French (basic)" value={data.languages} onChange={e => set('languages', e.target.value)} />
              </div>
            </div>
          )}

          {/* EXTRAS */}
          {currentStep.id === 'extras' && (
            <div className={styles.fields}>
              <div className={styles.field}>
                <label>Is there anything you&apos;re good at that&apos;s NOT on a CV or diploma? <span className={styles.req}>*</span></label>
                <textarea rows={4} placeholder="e.g. I run a small business selling clothes online and manage all the WhatsApp marketing myself. I helped my uncle&apos;s company improve their filing system. I&apos;m very good at calming down difficult customers — my managers always called me for the hard cases." value={data.hiddenSkills} onChange={e => set('hiddenSkills', e.target.value)} />
                <span className={styles.fieldHint}>This is where your real story lives. Don&apos;t skip it — this is often what gets someone hired over someone with a better CV.</span>
              </div>
              <div className={styles.field}>
                <label>What is your career goal? Where do you want to be in 2-3 years?</label>
                <textarea rows={3} placeholder="e.g. I want to grow into a senior data analyst role at a bank or fintech company, and eventually manage a team." value={data.careerGoal} onChange={e => set('careerGoal', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label>Why should an employer hire you over someone else? (be honest and direct)</label>
                <textarea rows={3} placeholder="e.g. I learn very fast, I don&apos;t wait to be told what to do, and I always finish what I start. I have never been let go from a job." value={data.whyHire} onChange={e => set('whyHire', e.target.value)} />
              </div>
            </div>
          )}

          <div className={styles.navButtons}>
            {saveError && <div className={styles.saveError}>{saveError}</div>}
            {surveyStep > 0 && (
              <button className={styles.backBtn} onClick={() => setSurveyStep(s => s - 1)}>← Back</button>
            )}
            {surveyStep < surveySteps.length - 1 ? (
              <button className={styles.btnPrimary} onClick={() => setSurveyStep(s => s + 1)}>
                Next →
              </button>
            ) : (
              <button className={styles.btnPrimary} onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving your profile...' : 'Submit and go to dashboard →'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
