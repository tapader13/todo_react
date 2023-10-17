import React from 'react';
import './counter.css';
const Country = (props) => {
  //   console.log(props);
  let { name, flags, area, capital, population } = props;

  const handleDlt = (name) => {
    props.onhandleDlt(name);
  };
  return (
    <>
      <div className='container'>
        <img style={{ width: '70%' }} src={flags.png} alt='' />
        <h1>Name: {name.common}</h1>
        <h3>Area: {area}</h3>
        <h3>Capital: {capital}</h3>
        <h3>Population: {population}</h3>
        <button
          onClick={() => {
            handleDlt(name.common);
          }}
          style={{ padding: '.4rem', fontSize: '1rem' }}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default Country;
