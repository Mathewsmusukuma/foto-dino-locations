import React from 'react'

export default function Header() {
    return (
        <>

<header>
  <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <div className="container-fluid">
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarExample01"
        aria-controls="navbarExample01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarExample01">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item active">
            <a className="nav-link" aria-current="page" href="#">Home</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div
    className="p-5 text-center bg-image img-fluid"
    >
    <div className="mask">
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="text-white">
          <h1 className="mb-3">FotoDino Cities</h1>
          <a className="btn btn-outline-light btn-lg" href="https://github.com/Foto-Dino/front-end-job/blob/main/api.md#city_object" role="button"
            >FotoDino Locations API</a>
        </div>
      </div>
    </div>
  </div>
</header>
            
        </>
    )
}
