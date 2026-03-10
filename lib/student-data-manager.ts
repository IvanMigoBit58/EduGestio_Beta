// Student Data Manager for handling persistent data storage
// Uses localStorage for development; can be replaced with backend API

export interface StudentIncident {
  id: string
  studentId: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  date: string
  notifiedParents: boolean
}

export interface StudentComment {
  id: string
  studentId: string
  author: string
  role: "tutor" | "counselor" | "teacher"
  content: string
  date: string
}

export interface StudentGrade {
  id: string
  studentId: string
  subject: string
  grade: number
  status: "approved" | "failed"
  date: string
}

export interface StudentAttendanceRecord {
  id: string
  studentId: string
  date: string
  status: "present" | "absent" | "excused"
  subject: string
  learningOutcome?: string
  hours?: number
}

export interface StudentCommunication {
  id: string
  studentId: string
  type: "individual" | "group"
  subject: string
  message: string
  date: string
  status: "sent" | "draft"
  recipients: string[]
}

export interface PaymentPlan {
  studentId: string
  planType: "single" | "3installments" | "5installments"
  amount: number
  dueDate: string
  paid: boolean
}

export interface NotificationSettings {
  studentId: string
  notifyBelow90: boolean
  notifyBelow80: boolean
  notifyBelow70: boolean
}

// Storage keys
const STORAGE_PREFIX = "edugestio_student_"
const INCIDENTS_KEY = "incidents"
const COMMENTS_KEY = "comments"
const GRADES_KEY = "grades"
const ATTENDANCE_KEY = "attendance"
const COMMUNICATIONS_KEY = "communications"
const PAYMENT_PLANS_KEY = "payment_plans"
const NOTIFICATION_SETTINGS_KEY = "notification_settings"

// Utility functions
function getStorageKey(studentId: string, dataType: string): string {
  return `${STORAGE_PREFIX}${studentId}_${dataType}`
}

// Incidents management
export const incidentManager = {
  add(studentId: string, incident: Omit<StudentIncident, "id" | "studentId">): StudentIncident {
    const newIncident: StudentIncident = {
      ...incident,
      id: `incident_${Date.now()}`,
      studentId,
    }
    const incidents = this.getAll(studentId)
    incidents.push(newIncident)
    localStorage.setItem(getStorageKey(studentId, INCIDENTS_KEY), JSON.stringify(incidents))
    return newIncident
  },

  getAll(studentId: string): StudentIncident[] {
    const stored = localStorage.getItem(getStorageKey(studentId, INCIDENTS_KEY))
    return stored ? JSON.parse(stored) : []
  },

  delete(studentId: string, incidentId: string): void {
    const incidents = this.getAll(studentId)
    const filtered = incidents.filter((i) => i.id !== incidentId)
    localStorage.setItem(getStorageKey(studentId, INCIDENTS_KEY), JSON.stringify(filtered))
  },

  update(studentId: string, incidentId: string, updates: Partial<StudentIncident>): void {
    const incidents = this.getAll(studentId)
    const index = incidents.findIndex((i) => i.id === incidentId)
    if (index !== -1) {
      incidents[index] = { ...incidents[index], ...updates }
      localStorage.setItem(getStorageKey(studentId, INCIDENTS_KEY), JSON.stringify(incidents))
    }
  },
}

// Comments management
export const commentManager = {
  add(
    studentId: string,
    comment: Omit<StudentComment, "id" | "studentId">
  ): StudentComment {
    const newComment: StudentComment = {
      ...comment,
      id: `comment_${Date.now()}`,
      studentId,
    }
    const comments = this.getAll(studentId)
    comments.push(newComment)
    localStorage.setItem(getStorageKey(studentId, COMMENTS_KEY), JSON.stringify(comments))
    return newComment
  },

  getAll(studentId: string): StudentComment[] {
    const stored = localStorage.getItem(getStorageKey(studentId, COMMENTS_KEY))
    return stored ? JSON.parse(stored) : []
  },

  delete(studentId: string, commentId: string): void {
    const comments = this.getAll(studentId)
    const filtered = comments.filter((c) => c.id !== commentId)
    localStorage.setItem(getStorageKey(studentId, COMMENTS_KEY), JSON.stringify(filtered))
  },
}

// Grades management
export const gradeManager = {
  add(studentId: string, grade: Omit<StudentGrade, "id" | "studentId">): StudentGrade {
    const newGrade: StudentGrade = {
      ...grade,
      id: `grade_${Date.now()}`,
      studentId,
    }
    const grades = this.getAll(studentId)
    grades.push(newGrade)
    localStorage.setItem(getStorageKey(studentId, GRADES_KEY), JSON.stringify(grades))
    return newGrade
  },

  getAll(studentId: string): StudentGrade[] {
    const stored = localStorage.getItem(getStorageKey(studentId, GRADES_KEY))
    return stored ? JSON.parse(stored) : []
  },

  getBySubject(studentId: string, subject: string): StudentGrade | undefined {
    const grades = this.getAll(studentId)
    return grades.find((g) => g.subject === subject)
  },
}

// Attendance management
export const attendanceManager = {
  add(studentId: string, record: Omit<StudentAttendanceRecord, "id" | "studentId">): StudentAttendanceRecord {
    const newRecord: StudentAttendanceRecord = {
      ...record,
      id: `attendance_${Date.now()}`,
      studentId,
    }
    const records = this.getAll(studentId)
    records.push(newRecord)
    localStorage.setItem(getStorageKey(studentId, ATTENDANCE_KEY), JSON.stringify(records))
    return newRecord
  },

  getAll(studentId: string): StudentAttendanceRecord[] {
    const stored = localStorage.getItem(getStorageKey(studentId, ATTENDANCE_KEY))
    return stored ? JSON.parse(stored) : []
  },

  getAttendancePercentage(studentId: string): number {
    const records = this.getAll(studentId)
    if (records.length === 0) return 100
    const presentCount = records.filter((r) => r.status === "present" || r.status === "excused").length
    return Math.round((presentCount / records.length) * 100)
  },

  getHoursByLearningOutcome(studentId: string, lo: string): number {
    const records = this.getAll(studentId)
    return records
      .filter((r) => r.learningOutcome === lo && r.hours)
      .reduce((sum, r) => sum + (r.hours || 0), 0)
  },
}

// Communications management
export const communicationManager = {
  add(studentId: string, comm: Omit<StudentCommunication, "id" | "studentId">): StudentCommunication {
    const newComm: StudentCommunication = {
      ...comm,
      id: `comm_${Date.now()}`,
      studentId,
    }
    const communications = this.getAll(studentId)
    communications.push(newComm)
    localStorage.setItem(getStorageKey(studentId, COMMUNICATIONS_KEY), JSON.stringify(communications))
    return newComm
  },

  getAll(studentId: string): StudentCommunication[] {
    const stored = localStorage.getItem(getStorageKey(studentId, COMMUNICATIONS_KEY))
    return stored ? JSON.parse(stored) : []
  },

  getSent(studentId: string): StudentCommunication[] {
    return this.getAll(studentId).filter((c) => c.status === "sent")
  },
}

// Payment plans management
export const paymentManager = {
  setPlan(studentId: string, plan: Omit<PaymentPlan, "studentId">): PaymentPlan {
    const newPlan: PaymentPlan = { ...plan, studentId }
    const stored = localStorage.getItem(getStorageKey(studentId, PAYMENT_PLANS_KEY))
    const plans: PaymentPlan[] = stored ? JSON.parse(stored) : []
    const index = plans.findIndex((p) => p.studentId === studentId)
    if (index !== -1) {
      plans[index] = newPlan
    } else {
      plans.push(newPlan)
    }
    localStorage.setItem(getStorageKey(studentId, PAYMENT_PLANS_KEY), JSON.stringify(plans))
    return newPlan
  },

  getPlan(studentId: string): PaymentPlan | null {
    const stored = localStorage.getItem(getStorageKey(studentId, PAYMENT_PLANS_KEY))
    const plans: PaymentPlan[] = stored ? JSON.parse(stored) : []
    return plans.find((p) => p.studentId === studentId) || null
  },
}

// Notification settings management
export const notificationSettingsManager = {
  set(studentId: string, settings: Omit<NotificationSettings, "studentId">): NotificationSettings {
    const newSettings: NotificationSettings = { ...settings, studentId }
    localStorage.setItem(getStorageKey(studentId, NOTIFICATION_SETTINGS_KEY), JSON.stringify(newSettings))
    return newSettings
  },

  get(studentId: string): NotificationSettings {
    const stored = localStorage.getItem(getStorageKey(studentId, NOTIFICATION_SETTINGS_KEY))
    return (
      stored
        ? JSON.parse(stored)
        : {
            studentId,
            notifyBelow90: true,
            notifyBelow80: true,
            notifyBelow70: false,
          }
    )
  },
}

// Utility function to check if student should be notified
export function shouldNotifyAbsentAbsences(studentId: string): boolean {
  const attendance = attendanceManager.getAttendancePercentage(studentId)
  const settings = notificationSettingsManager.get(studentId)

  if (attendance < 70 && settings.notifyBelow70) return true
  if (attendance < 80 && settings.notifyBelow80) return true
  if (attendance < 90 && settings.notifyBelow90) return true

  return false
}
