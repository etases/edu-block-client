import {
  Button,
  HorizontalStack,
  IconButton,
  Modal,
  NumberInput,
  Table,
  TextInput,
  VerticalStack,
} from '@components'
import { useStudentRecordPage } from '@hooks/use-page'
import { Text } from '@mantine/core'
import { IconReload } from '@tabler/icons'
import dayjs from 'dayjs'
import { forwardRef, ReactNode } from 'react'

const PrintComponent = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => <div ref={ref}>{children}</div>
)

export function StudentRecord() {
  const {
    table: { tableData, tableHeaders },
    form: { requestForm },
    state: {
      requestModal: { requestModalState, closeRequestModal, openRequestModal },
    },
    others: { handlePrint, printRef },
  } = useStudentRecordPage()

  return (
    <VerticalStack>
      {/* {forwardRef<HTMLDivElement>((props, ref) => (
        <div
          ref={ref}
          {...props}
        ></div>
      ))} */}
      <HorizontalStack position={'center'}>
        <VerticalStack sx={{ maxWidth: 1280, width: 1280 }}>
          <PrintComponent ref={printRef}>
            <Table
              tableData={tableData.map((item) => ({
                ...item,
                approvalDate: item.approvalDate
                  ? dayjs(item.approvalDate).format('YYYY-MM-DD')
                  : '',
                actions: (
                  <HorizontalStack>
                    <IconButton
                      label={'Request update'}
                      onClick={() => {
                        requestForm.loadFormValues({
                          subjectId: item.subjectId,
                          firstHalfScore: item.firstHalfScore,
                          secondHalfScore: item.secondHalfScore,
                          finalScore: item.finalScore,
                        })
                        openRequestModal()
                      }}
                    >
                      <IconReload />
                    </IconButton>
                  </HorizontalStack>
                ),
              }))}
              tableHeader={tableHeaders}
            />
          </PrintComponent>
        </VerticalStack>
      </HorizontalStack>
      <Button onClick={handlePrint}>Print Record</Button>
      <Modal
        opened={requestModalState}
        onClose={closeRequestModal}
        title={
          <Text
            size={'lg'}
            weight={'bold'}
          >
            Request record update
          </Text>
        }
      >
        <VerticalStack>
          <form onSubmit={requestForm.submitForm}>
            <VerticalStack>
              <HorizontalStack>
                <TextInput
                  label={'Subject'}
                  readOnly={true}
                  defaultValue={
                    tableData.find(
                      (item) =>
                        item.subjectId === requestForm.form.values.subjectId
                    )?.subjectName
                  }
                />
                <NumberInput
                  label={'First half'}
                  {...requestForm.inputPropsOf('firstHalfScore')}
                />
                <NumberInput
                  label={'Second half'}
                  {...requestForm.inputPropsOf('secondHalfScore')}
                />
                <NumberInput
                  label={'Final'}
                  {...requestForm.inputPropsOf('finalScore')}
                />
              </HorizontalStack>
              <HorizontalStack position={'apart'}>
                <Button color={'red'}>Reset</Button>
                <HorizontalStack>
                  <Button type={'submit'}>Request</Button>
                </HorizontalStack>
              </HorizontalStack>
            </VerticalStack>
          </form>
        </VerticalStack>
      </Modal>
    </VerticalStack>
  )
}
