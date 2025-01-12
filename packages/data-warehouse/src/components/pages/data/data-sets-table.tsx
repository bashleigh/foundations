import React, { SetStateAction, Dispatch, useContext, useState } from 'react'
import { Button, Table } from '@reapit/elements-legacy'
import { MessageContext } from '../../../context/message-context'
import { PagedApiResponse } from '../../../types/core'
import { DataSetModel } from '../../../types/data-sets'

import { SharesModel } from '../../../types/shares'
import { createRequest } from './data-handlers'

export interface DataSetsTableProps {
  dataSets: DataSetModel[]
  setShares: Dispatch<SetStateAction<PagedApiResponse<SharesModel> | undefined>>
  hasAccount: boolean
}

export interface TableCellProps<T> {
  cell: { value: T }
}

export const DataSetsTable: React.FC<DataSetsTableProps> = ({ dataSets, setShares, hasAccount }) => {
  const [creatingShare, setCreatingShare] = useState('')
  const RequestDataSetModel: React.FC<TableCellProps<string>> = ({ cell: { value } }) => {
    const { setMessageState } = useContext(MessageContext)
    const isLoading = Boolean(creatingShare && creatingShare === value)

    return (
      <Button
        onClick={createRequest(setMessageState, setCreatingShare, setShares, value)}
        disabled={isLoading || !hasAccount}
        loading={isLoading}
      >
        Create Share
      </Button>
    )
  }

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Provider',
      accessor: 'provider',
    },
    {
      Header: 'Description',
      accessor: 'summary',
    },
    {
      Header: 'Create Data Share',
      accessor: 'id',
      Cell: RequestDataSetModel,
    },
  ]

  return <Table columns={columns} data={dataSets} scrollable />
}

export default DataSetsTable
