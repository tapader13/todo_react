import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Country from './Country';
function App() {
  const [countrys, setCountrys] = useState(null);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
  const [val, setVal] = useState('');
  const [filtered, setFiltered] = useState(countrys);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => {
        if (!res.ok) {
          throw Error('Error Find ');
        }
        return res.json();
      })
      .then((data) => {
        setCountrys(data);
        setFiltered(data);
        setLoad(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setLoad(false);
      });
  }, []);
  const handleDelet = (name) => {
    // console.log(id);
    // alert(id);
    // console.log(countrys);
    let filterDlt = filtered.filter((country) => country.name.common !== name);
    setFiltered(filterDlt);
  };
  const handleChange = (e) => {
    let srcVal = e.target.value;
    setVal(srcVal);
  };
  useEffect(() => {
    let newVal = val.toLowerCase();
    let AfterFltr =
      countrys &&
      countrys.filter((country) => {
        let cnt = country.name.common.toLowerCase();
        return cnt.startsWith(newVal);
      });
    setFiltered(AfterFltr);
  }, [val]);
  return (
    <>
      <div style={{ textAlign: 'center', marginBlock: '1rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Country Info App</h1>
        <input
          onChange={handleChange}
          value={val}
          style={{
            paddingInline: '1rem',
            paddingBlock: '.3rem',
            border: 'none',
            outline: 'none',
            color: 'wheat',
            backgroundColor: 'gray',
            fontSize: '1rem',
            borderRadius: '10px',
          }}
          type='text'
          name='text'
          id='text'
          placeholder='Search Country'
        />
      </div>
      {load && <h1>Loading.....</h1>}
      {error && <h1>{error}</h1>}
      {filtered && (
        <div
          style={{
            backgroundColor: 'gray',
            margin: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingInline: '1rem',
            paddingBlock: '2rem',
          }}
        >
          {filtered.map((count, i) => {
            return <Country onhandleDlt={handleDelet} {...count} key={i} />;
          })}
        </div>
      )}
    </>
  );
}

export default App;
