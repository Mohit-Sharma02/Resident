/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react'

import QrReader from 'react-qr-reader'

type Props = {}

const CustomQRReader: React.FC<Props> = () => {
  const [result, setResult] = useState(null)
  const [err, setError] = useState(null)
  const handleScan = (data) => {
    if (data) {
      setResult(data)
    }
  }
  const handleError = (err) => {
    setError(err)
  }

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>RESULT:{result}</p>
      <br />
      <br />
      <br />
      <p>ERROR:{err}</p>
    </div>
  )
}

export default CustomQRReader
