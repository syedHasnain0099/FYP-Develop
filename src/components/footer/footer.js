import React from 'react'

const Footer = () => {
  return (
    <>
      <div
        className='text-center p-4 footer'
        style={{ backgroundColor: '#fafafa' }}
      >
        © 2022 Copyright:{' '}
        <a
          className='text-reset fw-bold'
          target='_blank'
          rel='noreferrer'
          href='https://github.com/syedHasnain0099/FYP-Develop'
        >
          ERental electronics Ltd.
        </a>
      </div>
    </>
  )
}

export default Footer
