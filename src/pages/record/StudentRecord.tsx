import {
  Button,
  Grid,
  GridCol,
  HorizontalStack,
  IconButton,
  Modal,
  NumberInput,
  Table,
  TextInput,
  VerticalStack,
} from '@components'
import { useStudentRecordPage } from '@hooks/use-page'
import { Divider, HoverCard, Text } from '@mantine/core'
import { IconHistory, IconReload } from '@tabler/icons'
import { dayjs } from '@utilities/functions'
import { forwardRef, ReactNode } from 'react'

const PrintComponent = forwardRef<HTMLDivElement, { children: ReactNode }>(
  ({ children }, ref) => <div ref={ref}>{children}</div>
)

const HistoryComponent = forwardRef((props, ref) => (
  <IconButton
    forwardedRef={ref}
    label={'History'}
    {...props}
  >
    <IconHistory />
  </IconButton>
))

export function StudentRecord() {
  const {
    table: { tableData, tableHeaders },
    form: { requestForm },
    state: {
      requestModal: { requestModalState, closeRequestModal, openRequestModal },
    },
    others: { handlePrint, printRef, teacher, account },
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
            <VerticalStack>
              <Grid grow={true}>
                <GridCol span={6}></GridCol>
                <GridCol span={6}></GridCol>
                <GridCol span={12}></GridCol>
              </Grid>
              <Divider />
              <Table
                tableData={tableData.map((item) => ({
                  ...item,
                  approvalDate: item.approvalDate
                    ? dayjs(item.approvalDate).format('YYYY-MM-DD')
                    : '',
                  actions: (
                    <HorizontalStack>
                      <HoverCard>
                        <HoverCard.Target>
                          <HistoryComponent />
                        </HoverCard.Target>
                        {item.history.length > 0 && (
                          <HoverCard.Dropdown>
                            <Table
                              tableHeader={tableHeaders.filter(
                                (col) =>
                                  col.identifier !== 'actions' &&
                                  col.identifier !== 'teacherName'
                              )}
                              tableData={item.history.map((item: any) => ({
                                ...item,
                                approvalDate: dayjs(item.approvalDate).format(
                                  'LLLL'
                                ),
                              }))}
                              heat={true}
                            />
                          </HoverCard.Dropdown>
                        )}
                      </HoverCard>
                      <IconButton
                        label={'Request update'}
                        onClick={() => {
                          requestForm.loadFormValues({
                            subjectId: item.subjectId,
                            firstHalfScore: item.firstHalfScore,
                            secondHalfScore: item.secondHalfScore,
                            finalScore: item.finalScore,
                            teacherId: item.teacherId,
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
            </VerticalStack>
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
                  max={10}
                  min={0}
                  step={0.25}
                  precision={2}
                  {...requestForm.inputPropsOf('firstHalfScore')}
                />
                <NumberInput
                  label={'Second half'}
                  max={10}
                  min={0}
                  precision={2}
                  step={0.25}
                  {...requestForm.inputPropsOf('secondHalfScore')}
                />
                <NumberInput
                  label={'Final'}
                  max={10}
                  min={0}
                  precision={2}
                  step={0.25}
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
