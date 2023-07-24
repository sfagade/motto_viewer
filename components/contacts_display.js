
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link'

export default function ContactsDisplay({ contacts }) {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const columns = [
    { field: 'record_id', headerName: 'ID', width: 130 },
    { field: 'make', headerName: 'Make', width: 130 },
    { field: 'model', headerName: 'Model', width: 130 },
    { field: 'price', headerName: 'Price', width: 90 },
    {
      field: 'views',
      headerName: 'Views',
      type: 'number',
      width: 90,
    },
    {
      field: 'created_at',
      headerName: 'Created',
      type: 'date',
      width: 140,
    }
  ];

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3000/api/v.0.1/vehicles?last_id=0')
      .then((res) => res.json())
      .then((data) => {
        console.log('received data ', data)
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

    return (
      <>
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            getRowId={(row) => row.record_id}
            rows={data[0]}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[10]}
          />
        </div>
      </>
    )
}
