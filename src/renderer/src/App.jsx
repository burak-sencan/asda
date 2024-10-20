import { useEffect, useState } from 'react'

const App = () => {
  const [motorSpeed, setMotorSpeed] = useState(0)
  const [speedPerSecond, setSpeedPerSecond] = useState(0)
  const [plcMaxOutputFreq, setPlcMaxOutputFreq] = useState(100000)
  const [pulsePerCycle, setPulsePerCycle] = useState(0)
  const [driverType, setDriverType] = useState('asda-a2')
  const [p144, setp144] = useState(0)
  const [p145, setp145] = useState(0)

  const asdaa2resulution = 1280000
  const asdab2resulation = 160000

  function gcd(a, b) {
    // EBOB'u hesaplamak için öklid algoritması
    return b === 0 ? a : gcd(b, a % b)
  }

  function simplifyFraction(numerator, denominator) {
    const gcdValue = gcd(numerator, denominator) // EBOB'u hesapla
    setp144(numerator / gcdValue)
    setp145(denominator / gcdValue)
  }

  useEffect(() => {
    if (motorSpeed === 0 || plcMaxOutputFreq === 0) {
      setSpeedPerSecond(0)
      setPulsePerCycle(0)
      setp144(0)
      setp145(0)
      return
    }

    setSpeedPerSecond(motorSpeed / 60)
    setPulsePerCycle(plcMaxOutputFreq / (motorSpeed / 60))

    if (driverType === 'asda-a2') {
      simplifyFraction(asdaa2resulution, plcMaxOutputFreq / (motorSpeed / 60))
    } else if (driverType === 'asda-b2') {
      simplifyFraction(asdab2resulation, plcMaxOutputFreq / (motorSpeed / 60))
    }
  }, [motorSpeed, plcMaxOutputFreq, driverType])

  return (
    <div className="flex h-screen text-slate-50 p-10 w-screen bg-slate-800 flex-col gap-4">
      <div className="flex items-center gap-4">
        <p className="w-96">İstenilen Motor Hızı(devir/dk)</p>
        <input
          className="p-1 bg-slate-600  focus:outline-none"
          type="number"
          min={0}
          value={motorSpeed}
          onChange={(e) => {
            setMotorSpeed(+e.target.value)
          }}
        />
      </div>

      {/* PLC Max output Frekans */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <p className="w-96">PLC max Çıkıs Frekans(pulse) </p>
          <p className="w-96">SA2 = 100.000 </p>
          <p className="w-96">SV2 = 200.000 </p>
        </div>
        <input
          className="p-1 bg-slate-600"
          type="number"
          value={plcMaxOutputFreq}
          onChange={(e) => {
            setPlcMaxOutputFreq(+e.target.value)
          }}
        />
      </div>

      {/* Motor Speed Per Second */}
      <div className="flex items-center gap-4">
        <p className="w-96">Saniyedeki Motor Hızı(devir/dk)</p>
        <input className="p-1 bg-slate-700" type="text" disabled value={speedPerSecond} />
      </div>

      {/* Pulse Per Cycle */}
      <div className="flex items-center gap-4">
        <p className="w-96">Motor 1 Turu İçin Gerekli Pulse adeti</p>
        <input className="p-1 bg-slate-700" type="text" disabled value={pulsePerCycle | 0} />
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`p-2 border rounded-md ${driverType === 'asda-a2' && 'bg-lime-700'}`}
          onClick={() => {
            setDriverType('asda-a2')
          }}
        >
          Asda-A2
        </button>
        <button
          className={`p-2 border rounded-md ${driverType === 'asda-b2' && 'bg-lime-700'}`}
          onClick={() => {
            setDriverType('asda-b2')
          }}
        >
          Asda-B2
        </button>
      </div>

      {/* Gear Ratio */}
      <div className="flex items-center gap-4">
        <div className="gap-1 w-32">
          <p className="w-96">P1-44</p>
          <div className="border"></div>
          <p className="w-96">P1-45</p>
        </div>
        <div className="flex flex-col w-32 gap-1">
          <input className="p-1 bg-slate-600 focus:outline-none" type="text" value={p144} />
          <div className="border"></div>
          <input className="p-1 bg-slate-600 focus:outline-none" type="text" value={p145} />
        </div>
      </div>
    </div>
  )
}
export default App
