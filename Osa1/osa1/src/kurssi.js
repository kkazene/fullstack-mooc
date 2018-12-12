import React from 'react'

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi}</h1>
  )
}

const Sisalto = ({ osat }) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
    </div>
  )
}
const Osa = ({ osa, tehtavia }) => {
  return (
    <p>{osa} {tehtavia}</p>
  )
}
const Yhteensa = ({ osat }) => {
  const sum = (acc, curr) => acc + curr
  const tehtavat = osat.map(osa => osa.tehtavia)
  return (
    <p>yhteensä {tehtavat.reduce(sum)} tehtävää</p>
  )
}

const Kurssi = ({ kurssi }) => (
  <div>
    <Otsikko kurssi={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
    <Yhteensa osat={kurssi.osat} />
  </div>
)

export default Kurssi