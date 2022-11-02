import { HorizontalStack, TextInput, VerticalStack } from '@components'
import { useClassroomDetailsPage } from '@hooks/use-page'

export function ClassroomDetails() {
  const { classroomDetails } = useClassroomDetailsPage()

  return (
    <VerticalStack>
      <HorizontalStack grow={true}>
        <TextInput
          readOnly={true}
          label={'Classroom name'}
          defaultValue={classroomDetails?.classroomName}
        />
        <TextInput
          readOnly={true}
          label={'Grade'}
          defaultValue={classroomDetails?.classroomGrade}
        />
      </HorizontalStack>
      {/* Teacher section */}
      <HorizontalStack
        align={'start'}
        grow={true}
      >
        {/* <Card p={'md'}>
          <HorizontalStack position={'center'}>
            <Image
              withPlaceholder={true}
              src={classroomDetails?.teacherAvatar}
              width={150}
              height={150}
              radius={'md'}
              placeholder={<IconUserCircle size={'auto'} />}
            />
          </HorizontalStack>
        </Card> */}
        <HorizontalStack
          // position={'apart'}
          grow={true}
        >
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherName}
            label={'Teacher name'}
          />
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherPhone}
            label={'Teacher phone'}
          />
          <TextInput
            readOnly={true}
            defaultValue={classroomDetails?.teacherEmail}
            label={'Teacher email'}
          />
        </HorizontalStack>
      </HorizontalStack>
    </VerticalStack>
  )
}
