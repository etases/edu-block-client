export interface AccountApiInterface {
  id: number
  username: string
  role: string
}

export interface ProfileApiInterface {
  id: number
  firstName: string
  lastName: string
  male: boolean
  avatar: string
  birthDate: string
  address: string
  phone: string
  email: string
}

export interface StudentApiInterface {
  id: number
  ethnic: string
  fatherName: string
  fatherJob: string
  motherName: string
  motherJob: string
  guardianName: string
  guardianJob: string
  homeTown: string
}

export interface ClassroomApiInterface {
  id: number
  name: string
  grade: number
  homeroomTeacher: {
    account: AccountApiInterface
    profile: ProfileApiInterface
  }
}

export interface SubjectApiInterface {
  id: number
  name: string
  identifier: string
  otherNames: string[]
}

export interface RecordApiInterface {
  id: number
  subjectId: number
  subject: SubjectApiInterface
  firstHalfScore: number
  secondHalfScore: number
  finalScore: number
  requestDate: string
  teacher: {
    account: AccountApiInterface
    profile: ProfileApiInterface
  }
  requester: {
    account: AccountApiInterface
    profile: ProfileApiInterface
  }
}

export interface EntryApiInterface {
  subjectId: number
  subject: SubjectApiInterface
  firstHalfScore: number
  secondHalfScore: number
  finalScore: number
  requestDate: string
  approvalDate: string
  teacher: {
    account: AccountApiInterface
    profile: ProfileApiInterface
  }
  requester: {
    account: AccountApiInterface
    profile: ProfileApiInterface
  }
  approver: {
    account: AccountApiInterface
    profile: ProfileApiInterface
  }
}

export interface PaginationApiInterface {
  totalPages: number
  totalEntries: number
  pageNumber: number
  pageSize: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
