import { useState } from 'react'
import './App.css'
import Galaxy from './components/Galaxy';
import Header from './components/Header';
import { AiOutlineZoomIn, AiOutlineZoomOut, AiFillEdit, AiFillDelete } from 'react-icons/ai'

function App() {
  const [galaxies, setGalaxies] = useState([
    {
      id: 1,
      name: "Andromeda",
      diameter: 220000
    },
    {
      id: 2,
      name: "Bima Sakti",
      diameter: 100000
    },
    {
      id: 3,
      name: "Triangulum",
      diameter: 60000
    },
  ]);

  const [galaxy, setGalaxy] = useState({
    id: 4,
    name: '',
    diameter: 0
  });

  const [galaxy2, setGalaxy2] = useState({
    id: 1,
    name: '',
    diameter: 0
  });

  const handleChange = (e) => {
    setGalaxy({
      ...galaxy,
      [e.target.name]: e.target.value
    })
  }

  const refreshTambah = () => {
    setGalaxy({
      id: galaxy.id + 1,
      name: '',
      diameter: 0
    })
  }

  const handleClickTambahDepan = (e) => {
    e.preventDefault();
    setGalaxy({
      ...galaxy,
      id: galaxy.id + 1
    })
    setGalaxies([
      {
        ...galaxy
      },
      ...galaxies
    ])
    refreshTambah();
  }

  const handleClickTambahBelakang = (e) => {
    e.preventDefault();
    setGalaxy({
      ...galaxy,
      id: galaxy.id + 1
    })
    setGalaxies([
      ...galaxies,
      {
        ...galaxy
      }
    ])
    refreshTambah()
  }

  const handleChange2 = (e) => {
    setGalaxy2({
      ...galaxy2,
      name: e.target.value
    })
  }

  return (
    <>
      <Header />
      <main>
        <form>
          <h1>Tambah</h1>
          <label>Id</label>
          <br />
          <input type="text" disabled value={galaxy.id} />
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" value={galaxy.name} name='name' id='name' onChange={handleChange} required />
          <br />
          <label htmlFor="diameter">Diameter</label>
          <br />
          <input type="number" value={galaxy.diameter} name='diameter' id='diameter' onChange={handleChange} />
          <br />
          <div>
            <button onClick={handleClickTambahDepan}>Depan</button>
            <button onClick={handleClickTambahBelakang}>Belakang</button>
          </div>
        </form>
        <form>
          <h1>Edit/Hapus Berdasarkan ID</h1>
          <label htmlFor='id'>Id</label>
          <br />
          <input type="number" id='id' name='id' required value={galaxy2.id} onChange={(e) => {
            setGalaxy2({
              ...galaxy2,
              id: parseInt(e.target.value)
            })
          }} />
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" value={galaxy2.name} name='name' id='name' onChange={handleChange2} />
          <br />
          <div>
            <button onClick={(e) => {
              e.preventDefault();
              galaxies.map((galaxy) => {
                if (galaxy.id === galaxy2.id) {
                  galaxy.diameter = galaxy.diameter + 100
                  setGalaxies([
                    ...galaxies
                  ])
                }
              })
            }}> <AiOutlineZoomIn /> Perbesar</button>
            <button onClick={(e) => {
              e.preventDefault();
              galaxies.map((galaxy) => {
                if (galaxy.id === galaxy2.id) {
                  galaxy.diameter = galaxy.diameter - 100
                  setGalaxies([
                    ...galaxies
                  ])
                }
              })
            }}> <AiOutlineZoomOut /> Perkecil</button>
          </div>
          <div>
            <button onClick={(e) => {
              e.preventDefault();
              galaxies.map((galaxy) => {
                if (galaxy.id === galaxy2.id) {
                  galaxy.name = galaxy2.name
                  setGalaxies([
                    ...galaxies
                  ])
                }
              })
            }}><AiFillEdit />Edit</button>
            <button onClick={(e) => {
              e.preventDefault();
              const newGalaxies = galaxies.filter((galaxy) => galaxy.id !== galaxy2.id)
              setGalaxies([
                ...newGalaxies
              ])
            }}><AiFillDelete />Hapus</button>
          </div>
        </form>
        <form>
          <h1>Hapus</h1>
          <div>
            <button onClick={(e) => {
              e.preventDefault();
              if (galaxy.id <= 1) {
                return false;
              }
              setGalaxy({
                ...galaxy,
                id: galaxy.id - 1
              })
              const newGalaxies = galaxies.slice(1)
              setGalaxies(newGalaxies)
            }}>Depan</button>
            <button onClick={(e) => {
              e.preventDefault();
              if (galaxy.id <= 1) {
                return false;
              }
              setGalaxy({
                ...galaxy,
                id: galaxy.id - 1
              })
              const newGalaxies = galaxies.filter((object) => object.id !== galaxy.id - 1)
              setGalaxies(newGalaxies)
            }}>Belakang</button>
          </div>
          <button onClick={(e) => {
            e.preventDefault();
            setGalaxies([])
          }}>Semua</button>
        </form>
      </main>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Diameter</th>
          </tr>
        </thead>
        <tbody>
          {
            galaxies.map((galaxy) => {
              return <Galaxy key={galaxy.id} {...galaxy} />
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default App
