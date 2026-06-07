import { useEffect, useMemo, useState } from 'react'
import './App.css'
import heroImage from './assets/hero.png'
import { cloudConcepts } from './data/cloudConcepts'

type Page = 'home' | 'study' | 'quiz' | 'review'

type WrongQuiz = {
  conceptId: string
  quizIndex: number
}

type ReviewSnapshot = {
  conceptId: string
  quizIndex: number
  category: string
  title: string
  type: 'OX' | 'MULTIPLE_CHOICE'
  question: string
  options?: string[]
  answer: string
  explanation: string
}

const STORAGE_COMPLETED = 'cloudStudyCompleted'
const STORAGE_WRONG = 'cloudStudyWrong'
const STORAGE_LAST_DATE = 'cloudStudyLastDate'
const STORAGE_STREAK = 'cloudStudyStreak'

const pageTabs: { id: Page; label: string }[] = [
  { id: 'home', label: '홈' },
  { id: 'study', label: '학습' },
  { id: 'quiz', label: '퀴즈' },
  { id: 'review', label: '오답' },
]

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const previousDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  date.setDate(date.getDate() - 1)
  return formatDate(date)
}

const readStoredValue = <T,>(key: string, fallback: T): T => {
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

const readStoredText = (key: string) => {
  try {
    return window.localStorage.getItem(key) || ''
  } catch {
    return ''
  }
}

const readStoredNumber = (key: string) => {
  try {
    return Number(window.localStorage.getItem(key)) || 0
  } catch {
    return 0
  }
}

const flattenQuizzes = cloudConcepts.flatMap((concept) =>
  concept.quiz.map((quiz, quizIndex) => ({
    concept,
    quiz,
    quizIndex,
  })),
)

const toPercent = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value / total) * 100)

function App() {
  const [page, setPage] = useState<Page>('home')
  const [completedIds, setCompletedIds] = useState<string[]>(() => readStoredValue(STORAGE_COMPLETED, []))
  const [wrongQuizzes, setWrongQuizzes] = useState<WrongQuiz[]>(() => readStoredValue(STORAGE_WRONG, []))
  const [lastStudyDate, setLastStudyDate] = useState<string>(() => readStoredText(STORAGE_LAST_DATE))
  const [streak, setStreak] = useState<number>(() => readStoredNumber(STORAGE_STREAK))
  const [studyIndex, setStudyIndex] = useState<number>(0)
  const [quizIndex, setQuizIndex] = useState<number>(0)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [showQuizResult, setShowQuizResult] = useState(false)
  const [reviewIndex, setReviewIndex] = useState<number>(0)
  const [reviewAnswer, setReviewAnswer] = useState<string | null>(null)
  const [showReviewResult, setShowReviewResult] = useState(false)
  const [reviewSnapshot, setReviewSnapshot] = useState<ReviewSnapshot | null>(null)

  const todayKey = useMemo(() => formatDate(new Date()), [])

  const todayConcepts = useMemo(() => {
    const total = cloudConcepts.length
    const start = Number(todayKey.slice(-2)) % total
    const items: typeof cloudConcepts = []
    for (let i = 0; i < 5; i += 1) {
      items.push(cloudConcepts[(start + i) % total])
    }
    return items
  }, [todayKey])

  const wrongReviewItems = useMemo(() => {
    return wrongQuizzes
      .map((item) => {
        const concept = cloudConcepts.find((concept) => concept.id === item.conceptId)
        if (!concept) return null
        const quiz = concept.quiz[item.quizIndex]
        if (!quiz) return null
        return { concept, quiz, quizIndex: item.quizIndex }
      })
      .filter((entry): entry is { concept: typeof cloudConcepts[number]; quiz: typeof cloudConcepts[number]['quiz'][number]; quizIndex: number } => Boolean(entry))
  }, [wrongQuizzes])

  const todayCompleteCount = todayConcepts.filter((concept) => completedIds.includes(concept.id)).length
  const totalCompleteCount = completedIds.length
  const wrongCount = wrongQuizzes.length
  const todayProgress = toPercent(todayCompleteCount, todayConcepts.length)
  const totalProgress = toPercent(totalCompleteCount, cloudConcepts.length)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedIds))
  }, [completedIds])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_WRONG, JSON.stringify(wrongQuizzes))
  }, [wrongQuizzes])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_LAST_DATE, lastStudyDate)
    window.localStorage.setItem(STORAGE_STREAK, String(streak))
  }, [lastStudyDate, streak])

  const recordStudyDay = () => {
    const today = formatDate(new Date())
    setLastStudyDate((previous) => {
      if (previous === today) {
        return previous
      }
      setStreak((current) =>
        previous === previousDate(today) && current > 0 ? current + 1 : 1,
      )
      return today
    })
  }

  const navigate = (nextPage: Page) => {
    setPage(nextPage)
    if (nextPage === 'study') {
      setStudyIndex(0)
    }
    if (nextPage === 'quiz') {
      setQuizIndex(0)
      setQuizAnswer(null)
      setShowQuizResult(false)
    }
    if (nextPage === 'review') {
      setReviewIndex(0)
      setReviewAnswer(null)
      setShowReviewResult(false)
      setReviewSnapshot(null)
    }
  }

  const addWrongQuiz = (conceptId: string, quizIndex: number) => {
    setWrongQuizzes((previous) => {
      const exists = previous.some((entry) => entry.conceptId === conceptId && entry.quizIndex === quizIndex)
      if (exists) return previous
      return [...previous, { conceptId, quizIndex }]
    })
  }

  const removeWrongQuiz = (conceptId: string, quizIndex: number) => {
    setWrongQuizzes((previous) => previous.filter((entry) => !(entry.conceptId === conceptId && entry.quizIndex === quizIndex)))
  }

  const handleCompleteConcept = () => {
    const current = todayConcepts[studyIndex]
    if (!current) return
    if (!completedIds.includes(current.id)) {
      setCompletedIds((previous) => [...previous, current.id])
    }
    recordStudyDay()
  }

  const handleQuizAnswer = (value: string) => {
    const current = flattenQuizzes[quizIndex]
    if (!current || showQuizResult) return
    setQuizAnswer(value)
    setShowQuizResult(true)
    const isCorrect = value === current.quiz.answer
    if (isCorrect) {
      removeWrongQuiz(current.concept.id, current.quizIndex)
    } else {
      addWrongQuiz(current.concept.id, current.quizIndex)
    }
  }

  const handleReviewAnswer = (value: string) => {
    const current = wrongReviewItems[reviewIndex]
    if (!current || showReviewResult) return
    setReviewAnswer(value)
    setShowReviewResult(true)
    setReviewSnapshot({
      conceptId: current.concept.id,
      quizIndex: current.quizIndex,
      category: current.concept.category,
      title: current.concept.title,
      type: current.quiz.type,
      question: current.quiz.question,
      options: current.quiz.options,
      answer: current.quiz.answer,
      explanation: current.quiz.explanation,
    })

    const isCorrect = value === current.quiz.answer
    if (isCorrect) {
      removeWrongQuiz(current.concept.id, current.quizIndex)
      recordStudyDay()
    }
  }

  const goNextQuiz = () => {
    setQuizIndex((prev) => Math.min(prev + 1, flattenQuizzes.length))
    setQuizAnswer(null)
    setShowQuizResult(false)
  }

  const goNextReview = () => {
    setReviewIndex((prev) => Math.min(prev + 1, Math.max(wrongReviewItems.length - 1, 0)))
    setReviewAnswer(null)
    setShowReviewResult(false)
    setReviewSnapshot(null)
  }

  const getOptionClass = (option: string, answer: string, selected: string | null, showResult: boolean) => {
    if (!showResult) {
      return selected === option ? 'option-card is-selected' : 'option-card'
    }
    if (option === answer) return 'option-card is-correct'
    if (selected === option) return 'option-card is-incorrect'
    return 'option-card is-muted'
  }

  const currentStudyConcept = todayConcepts[studyIndex]
  const currentQuizItem = flattenQuizzes[quizIndex]
  const currentReviewItem = wrongReviewItems[reviewIndex]
  const reviewDisplayItem = showReviewResult && reviewSnapshot ? reviewSnapshot : currentReviewItem

  const renderHeader = () => (
    <header className="app-header">
      <button type="button" className="brand-button" onClick={() => navigate('home')}>
        <span className="brand-mark">CS</span>
        <span>
          <strong>5분 클라우드</strong>
          <small>{todayKey}</small>
        </span>
      </button>

      <nav className="mode-nav" aria-label="학습 화면">
        {pageTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={page === tab.id ? 'mode-tab is-active' : 'mode-tab'}
            aria-current={page === tab.id ? 'page' : undefined}
            onClick={() => navigate(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  )

  const renderHome = () => (
    <div className="screen-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Daily cloud review</span>
          <h1>오늘의 개념 5개만 정확하게.</h1>
          <p>짧게 읽고, 바로 풀고, 틀린 문제만 다시 보는 클라우드 학습 루틴.</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => navigate('study')}>학습 시작</button>
            <button type="button" className="secondary-button" onClick={() => navigate('quiz')}>퀴즈 풀기</button>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src={heroImage} alt="" />
        </div>
      </section>

      <section className="metrics-grid" aria-label="학습 현황">
        <article className="metric-card">
          <span>오늘 진행률</span>
          <strong>{todayCompleteCount}/{todayConcepts.length}</strong>
          <div className="progress-track"><span style={{ width: `${todayProgress}%` }} /></div>
        </article>
        <article className="metric-card">
          <span>전체 완료</span>
          <strong>{totalCompleteCount}/{cloudConcepts.length}</strong>
          <div className="progress-track"><span style={{ width: `${totalProgress}%` }} /></div>
        </article>
        <article className="metric-card">
          <span>오답 복습</span>
          <strong>{wrongCount}</strong>
          <p>{wrongCount === 0 ? '정리된 상태' : '다시 볼 문제'}</p>
        </article>
        <article className="metric-card">
          <span>연속 학습</span>
          <strong>{streak}일</strong>
          <p>{lastStudyDate || '기록 없음'}</p>
        </article>
      </section>

      <section className="content-layout">
        <div className="panel">
          <div className="section-heading">
            <span className="eyebrow">Today</span>
            <h2>오늘 학습 카드</h2>
          </div>
          <div className="lesson-list">
            {todayConcepts.map((concept, index) => {
              const isDone = completedIds.includes(concept.id)
              return (
                <button
                  key={concept.id}
                  type="button"
                  className={isDone ? 'lesson-row is-done' : 'lesson-row'}
                  onClick={() => {
                    setStudyIndex(index)
                    setPage('study')
                  }}
                >
                  <span className="lesson-number">{index + 1}</span>
                  <span className="lesson-text">
                    <small>{concept.category}</small>
                    <strong>{concept.title}</strong>
                  </span>
                  <span className="lesson-state">{isDone ? '완료' : '대기'}</span>
                </button>
              )
            })}
          </div>
        </div>

        <aside className="panel quick-panel">
          <div className="section-heading">
            <span className="eyebrow">Flow</span>
            <h2>학습 흐름</h2>
          </div>
          <button type="button" className="flow-button" onClick={() => navigate('study')}>
            <span>01</span>
            <strong>개념 읽기</strong>
          </button>
          <button type="button" className="flow-button" onClick={() => navigate('quiz')}>
            <span>02</span>
            <strong>전체 퀴즈</strong>
          </button>
          <button type="button" className="flow-button" onClick={() => navigate('review')}>
            <span>03</span>
            <strong>오답 정리</strong>
          </button>
        </aside>
      </section>
    </div>
  )

  const renderStudy = () => {
    if (!currentStudyConcept) {
      return (
        <section className="panel empty-panel">
          <h1>오늘 학습할 개념이 없습니다.</h1>
          <button type="button" className="primary-button" onClick={() => navigate('home')}>홈으로</button>
        </section>
      )
    }

    const isFinished = completedIds.includes(currentStudyConcept.id)

    return (
      <div className="screen-stack">
        <section className="focus-panel">
          <div className="focus-topline">
            <span className="eyebrow">Concept {studyIndex + 1}/{todayConcepts.length}</span>
            <span className="category-pill">{currentStudyConcept.category}</span>
          </div>
          <h1>{currentStudyConcept.title}</h1>
          <div className="progress-track large"><span style={{ width: `${toPercent(studyIndex + 1, todayConcepts.length)}%` }} /></div>

          <div className="concept-grid">
            <article>
              <span>요약</span>
              <p>{currentStudyConcept.summary}</p>
            </article>
            <article>
              <span>비유</span>
              <p>{currentStudyConcept.analogy}</p>
            </article>
            <article>
              <span>실무 활용</span>
              <p>{currentStudyConcept.practicalUse}</p>
            </article>
            <article>
              <span>혼동 포인트</span>
              <p>{currentStudyConcept.confusionPoint}</p>
            </article>
          </div>
        </section>

        <div className="action-bar">
          <button type="button" className="secondary-button" onClick={() => navigate('home')}>홈</button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setStudyIndex((prev) => Math.max(prev - 1, 0))}
            disabled={studyIndex === 0}
          >
            이전
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => setStudyIndex((prev) => Math.min(prev + 1, todayConcepts.length - 1))}
            disabled={studyIndex === todayConcepts.length - 1}
          >
            다음
          </button>
          <button type="button" className={isFinished ? 'primary-button is-complete' : 'primary-button'} onClick={handleCompleteConcept}>
            {isFinished ? '완료됨' : '완료 표시'}
          </button>
        </div>
      </div>
    )
  }

  const renderQuiz = () => {
    const isFinished = quizIndex >= flattenQuizzes.length
    if (isFinished) {
      return (
        <section className="panel empty-panel">
          <span className="eyebrow">Quiz complete</span>
          <h1>퀴즈 완료</h1>
          <p>오답 복습에서 남은 문제를 정리할 수 있습니다.</p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => navigate('review')}>오답 복습</button>
            <button type="button" className="secondary-button" onClick={() => navigate('home')}>홈으로</button>
          </div>
        </section>
      )
    }

    if (!currentQuizItem) return null

    const isCorrect = quizAnswer === currentQuizItem.quiz.answer
    const showResult = showQuizResult && quizAnswer !== null
    const options = currentQuizItem.quiz.type === 'OX' ? ['O', 'X'] : currentQuizItem.quiz.options || []

    return (
      <div className="screen-stack">
        <section className="focus-panel quiz-panel">
          <div className="focus-topline">
            <span className="eyebrow">Quiz {quizIndex + 1}/{flattenQuizzes.length}</span>
            <span className="category-pill">{currentQuizItem.concept.category}</span>
          </div>
          <h1>{currentQuizItem.concept.title}</h1>
          <p className="question-text">{currentQuizItem.quiz.question}</p>

          <div className="option-grid">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleQuizAnswer(option)}
                className={getOptionClass(option, currentQuizItem.quiz.answer, quizAnswer, showResult)}
                disabled={showQuizResult}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult && (
            <div className={isCorrect ? 'feedback-box is-correct' : 'feedback-box is-incorrect'}>
              <strong>{isCorrect ? '정답입니다' : '오답입니다'}</strong>
              <p>{currentQuizItem.quiz.explanation}</p>
            </div>
          )}
        </section>

        <div className="action-bar">
          <button type="button" className="secondary-button" onClick={() => navigate('home')}>홈</button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setQuizIndex((prev) => Math.max(prev - 1, 0))
              setQuizAnswer(null)
              setShowQuizResult(false)
            }}
            disabled={quizIndex === 0}
          >
            이전
          </button>
          <button type="button" className="primary-button" onClick={goNextQuiz}>다음</button>
        </div>
      </div>
    )
  }

  const renderReview = () => {
    if (!reviewDisplayItem) {
      return (
        <section className="panel empty-panel">
          <span className="eyebrow">Review</span>
          <h1>오답이 없습니다.</h1>
          <p>퀴즈를 풀면 틀린 문제만 이곳에 모입니다.</p>
          <button type="button" className="primary-button" onClick={() => navigate('quiz')}>퀴즈 풀기</button>
        </section>
      )
    }

    const quiz = 'quiz' in reviewDisplayItem ? reviewDisplayItem.quiz : reviewDisplayItem
    const concept = 'concept' in reviewDisplayItem ? reviewDisplayItem.concept : reviewDisplayItem
    const isCorrect = reviewAnswer === quiz.answer
    const showResult = showReviewResult && reviewAnswer !== null
    const options = quiz.type === 'OX' ? ['O', 'X'] : quiz.options || []
    const totalReviewCount = Math.max(wrongReviewItems.length + (reviewSnapshot ? 1 : 0), 1)

    return (
      <div className="screen-stack">
        <section className="focus-panel quiz-panel">
          <div className="focus-topline">
            <span className="eyebrow">Review {Math.min(reviewIndex + 1, totalReviewCount)}/{totalReviewCount}</span>
            <span className="category-pill">{concept.category}</span>
          </div>
          <h1>{concept.title}</h1>
          <p className="question-text">{quiz.question}</p>

          <div className="option-grid">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleReviewAnswer(option)}
                className={getOptionClass(option, quiz.answer, reviewAnswer, showResult)}
                disabled={showReviewResult}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult && (
            <div className={isCorrect ? 'feedback-box is-correct' : 'feedback-box is-incorrect'}>
              <strong>{isCorrect ? '정답입니다. 오답 목록에서 제거되었습니다.' : '다시 한 번 확인하세요'}</strong>
              <p>{quiz.explanation}</p>
            </div>
          )}
        </section>

        <div className="action-bar">
          <button type="button" className="secondary-button" onClick={() => navigate('home')}>홈</button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => {
              setReviewIndex((prev) => Math.max(prev - 1, 0))
              setReviewAnswer(null)
              setShowReviewResult(false)
              setReviewSnapshot(null)
            }}
            disabled={reviewIndex === 0}
          >
            이전
          </button>
          <button type="button" className="primary-button" onClick={goNextReview}>다음</button>
        </div>
      </div>
    )
  }

  return (
    <main className="app-shell">
      <div className="app-container">
        {renderHeader()}
        {page === 'home' && renderHome()}
        {page === 'study' && renderStudy()}
        {page === 'quiz' && renderQuiz()}
        {page === 'review' && renderReview()}
      </div>
    </main>
  )
}

export default App
