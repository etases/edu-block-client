import {
  AccountList,
  AccountProfile,
  AccountRoot,
  AdminAccountList,
  AdminDashboard,
  App,
  Classroom,
  ClassroomDetails,
  ClassroomList,
  ClassroomStudentList,
  ClassroomTeacherList,
  Dashboard,
  Home,
  Login,
  NotFound,
  RecordList,
  Root,
  StaffAccountList,
  StaffDashboard,
  StudentAccountList,
  StudentDashboard,
  StudentProfile,
  StudentRecord,
  TeacherAccountList,
  TeacherDashboard,
  Test,
} from '@pages'
import { Navigate, Outlet, RouteObject } from 'react-router-dom'

export type ROLE = 'ADMIN' | 'STAFF' | 'TEACHER' | 'STUDENT' | 'ANY' | 'GUEST'

type AuthRoutesType = {
  [key in ROLE]: RouteObject[]
}

const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: 'Admin',
  },
]

const staffRoutes: RouteObject[] = [
  {
    path: 'staff',
    element: 'Staff',
  },
]

const teacherRoutes: RouteObject[] = [
  {
    path: 'teacher',
    element: 'Teacher',
  },
]

const studentRoutes: RouteObject[] = [
  {
    path: 'student',
    element: 'Student',
  },
]

const authRoutes: AuthRoutesType = {
  ANY: [],
  GUEST: [],
  ADMIN: adminRoutes,
  STAFF: staffRoutes,
  TEACHER: teacherRoutes,
  STUDENT: studentRoutes,
}

export const routes = ({ role = 'GUEST' }: { role: ROLE }): RouteObject => ({
  path: '/',
  element: <Root />,
  children: [
    {
      index: true,
      element: (
        <Navigate
          to={'home'}
          replace={true}
        />
      ),
    },
    {
      path: 'home',
      element: <Home />,
    },
    { path: 'login', element: <Login /> },
    {
      path: 'app',
      element: <App />,
      children: [
        {
          index: true,
          element: (
            <Navigate
              to={'dashboard'}
              replace={true}
            />
          ),
        },
        {
          path: 'dashboard',
          element: <Dashboard />,
          children: [
            {
              path: 'admin',
              element: <AdminDashboard />,
            },
            {
              path: 'staff',
              element: <StaffDashboard />,
            },
            {
              path: 'teacher',
              element: <TeacherDashboard />,
            },
            {
              path: 'student',
              element: <StudentDashboard />,
            },
          ],
        },
        {
          path: 'account-list',
          element: <AccountRoot />,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={'all'}
                  replace={true}
                />
              ),
            },
            {
              path: 'all',
              element: <AccountList />,
            },
            {
              path: 'admins',
              element: <AdminAccountList />,
            },
            {
              path: 'staffs',
              element: <StaffAccountList />,
            },
            {
              path: 'teachers',
              element: <TeacherAccountList />,
            },
            {
              path: 'students',
              element: <StudentAccountList />,
            },
          ],
        },
        {
          path: 'classroom-list',
          element: <Outlet />,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={'all'}
                  replace={true}
                />
              ),
            },
            {
              path: 'all',
              element: <ClassroomList />,
            },
          ],
        },
        {
          path: 'record-list',
          element: <Outlet />,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={'all'}
                  replace={true}
                />
              ),
            },
            {
              path: 'all',
              element: <RecordList />,
            },
          ],
        },
        {
          path: 'account',
          element: <Outlet />,
          children: [
            {
              path: ':accountId',
              element: <AccountProfile />,
              children: [
                {
                  path: 'record',
                  element: <StudentProfile />,
                  children: [
                    {
                      path: ':classroomId',
                      element: <StudentRecord />,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: 'classroom/:classroomId',
          element: <Classroom />,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={'details'}
                  replace={true}
                />
              ),
            },
            {
              path: 'details',
              element: <ClassroomDetails />,
            },
            {
              path: 'students',
              element: <ClassroomStudentList />,
            },
            {
              path: 'teachers',
              element: <ClassroomTeacherList />,
            },
          ],
        },
        ...authRoutes[role],
      ],
    },
    {
      path: 'test',
      element: <Test />,
    },
    { path: 'not-found', element: <NotFound /> },
    {
      path: '*',
      element: (
        <Navigate
          to={'not-found'}
          replace={true}
        />
      ),
    },
  ],
})
