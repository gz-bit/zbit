import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns  from '@mui/lab/AdapterDateFns'
import enlocale from 'date-fns/locale/en-GB'
import delocale from 'date-fns/locale/de'

import SignIn from '../components/SignIn'

const sayOuch = () => alert('Ouch!!')



const Mui = () => {
  const [value, setValue] = useState<Date>(new Date())  
  const newDate = (newValue) => {
    setValue(newValue)
    console.log(newValue)
  }
  return (<>
    <h1>@mui Material UI</h1>

    <SignIn />
    <p>
      <Button variant="contained" color="primary">primary</Button><br/>
      <Button variant="contained" color="secondary">secundary</Button><br/>
      <Button variant="contained" color="success">success</Button><br/>
      <Button variant="contained" color="error">error</Button><br/>
      <Button variant="contained" color="info">info</Button><br/>
      <Button variant="contained" color="warning">warning</Button><br/>
      <Button onClick={sayOuch}>Click me!</Button>
    </p>
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={delocale}>
      <DatePicker 
        mask="__.__.____"
        value={value}
        onChange={(newValue) => newDate(newValue)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  </>)
}
export default Mui

