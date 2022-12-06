export const ENDPOINT = {
  MISC: {
    HELLO: '/',
    LOGIN: '/login',
    HELLO_ADMIN: '/helloadmin',
  },
  AUTH: {
    LOGIN: '/login',
  },
  CREATE: {
    ACCOUNTS: '/account/list',
    RECORD_UPDATE_REQUEST: '/record/request',
    CLASSROOM: '/classroom',
    CLASSROOM_STUDENT: '/classroom/{id}/student',
    CLASSROOM_TEACHER: '/classroom/{id}/teacher',
    VERIFIED_KEY: '/updater',
  },
  READ: {
    PERSONAL_ACCOUNT_INFORMATION: '/account',
    PERSONAL_RECORD_INFORMATION: '/record/{classroomId}',
    ACCOUNT_INFORMATION: '/account/{id}',
    ACCOUNT_LIST: '/account/list',
    ACCOUNT_LIST_BY_ROLE: '/account/role/{role}/list',
    STUDENT_RECORD: '/record/{classroomId}/{studentId}',
    PENDING_VERIFY_RECORD_LIST: '/record/pending/list',
    STUDENT_PENDING_VERIFY_RECORD_LIST: '/record/pending/list/{studentId}',
    CLASSROOM_LIST: '/classroom',
    TEACHER_CLASSROOM_LIST: '/classroom/teacher',
    STUDENT_CLASSROOM_LIST: '/classroom/student',
    SPECIFIC_STUDENT_CLASSROOM_LIST: '/classroom/student/{studentId}',
    HOMEROOM_TEACHER_CLASSROOM_LIST: '/classroom/homeroom',
    CLASSROOM_INFORMATION: '/classroom/{id}',
    CLASSROOM_STUDENT: '/classroom/{id}/student',
    CLASSROOM_TEACHER: '/classroom/{id}/teacher',
    SUBJECT_LIST: '/subject/list',
    VERIFIED_KEY_LIST: '/updater/list',
    CLASSIFICATION_LIST: '/classification/list',
    CLASSROOM_RECORD_LIST: '/record/list/classroom/{classroomId}',
    GRADE_RECORD_LIST: '/record/list/grade/{grade}/{year}',
  },
  UPDATE: {
    ACCOUNT_PASSWORD: '/account/list/password',
    ACCOUNT_PROFILE: '/account/{id}/profile',
    CLASSROOM_INFORMATION: '/classroom/{id}',
    PERSONAL_PASSWORD: '/account/password',
    RECORD_UPDATE: '/record/entry',
    SELF_PROFILE: '/account/self/profile',
    STUDENT_INFORMATION: '/account/{id}/student',
    STUDENT_PENDING_RECORD_APPROVAL_STATE: '/record/pending/verify',
    STUDENT_RECORD_TABLE: '/record/request/list',
  },
  DELETE: {
    CLASSROOM_STUDENT: '/classroom/{id}/student',
    CLASSROOM_TEACHER: '/classroom/{id}/teacher',
    VERIFIED_KEY: '/updater/{key}',
  },
}
