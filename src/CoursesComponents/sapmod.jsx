import React, { useState, useEffect, useContext } from 'react'
import './sapmod.css'
import ContactForm from '../Homepage/ContactForm'
import { CityContext } from '../CityContext'

const SapModComponent = ({ pageId }) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showPopupForm, setShowPopupForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const city = useContext(CityContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Jsonfolder/sapmod.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        const pageData = jsonData?.[pageId]

        if (pageData) {
          pageData.title2 = pageData.title2?.replace(/{city}/g, city)
          pageData.description = pageData.description?.replace(/{city}/g, city)
          pageData.summary = pageData.summary?.replace(/{city}/g, city)
          pageData.features = pageData.features?.map((feature) => ({
            ...feature,
            description: feature.description?.replace(/{city}/g, city),
          }))
          pageData.overview = {
            ...pageData.overview,
            title: pageData.overview.title?.replace(/{city}/g, city),
            modules: pageData.overview.modules?.map((module) => ({
              ...module,
              name: module.name?.replace(/{city}/g, city),
            })),
          }

          setData(pageData)
        } else {
          throw new Error('Page data not found')
        }

        setLoading(false)
      } catch (error) {
        console.error('Fetch error:', error)
        setError(error)
        setLoading(false)
      }
    }

    fetchData()
  }, [pageId, city])

  useEffect(() => {
    if (data && data.noteAdvance) {
      const container = document.getElementById('glow-container')
      if (container) {
        container.innerHTML = ''
        data.noteAdvance.split('').forEach((letter, index) => {
          const span = document.createElement('span')
          span.textContent = letter
          span.style.animationDelay = `${index * 0.1}s`
          container.appendChild(span)
        })
      }
    }
  }, [data])

  const handleDownloadBrochureClick = () => {
    // Open the contact form first
    setShowPopupForm(true)
    console.log('Popup form should be visible:', showPopupForm)
  }

  const handleFormSubmit = () => {
    setFormSubmitted(true)
    setShowPopupForm(false) // Close the form after submission

    // Start the download
    if (data && data.downloadLink) {
      window.open(data.downloadLink, '_blank')
    } else {
      alert('Download link is not available.')
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>
  }

  if (!data) {
    return <p>No data available for the specified page.</p>
  }

  return (
    <div className="sap-mod-container">
      <h1 className="sap-mod-heading">SYLLABUS</h1>
      <div className="sap-mod-card">
        <h2
          className="text-2xl font-bold mb-4"
          dangerouslySetInnerHTML={{ __html: data.title2 }}
        />
        <p className="mb-4 text-lg">{data.description}</p>
        <p className="text-base mb-6">{data.summary}</p>

        <div id="glow-container" className="glow-text"></div>

        <p className="text-danger mb-6">{data.noteMaster}</p>
        <div className="space-y-4">
          {data.features && data.features.length > 0 ? (
            data.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <span className="bg-primary-foreground text-primary rounded-full px-3 py-1 text-sm font-bold">
                  {feature.label}
                </span>
                <span className="ml-3 text-base">{feature.description}</span>
              </div>
            ))
          ) : (
            <p>No features available.</p>
          )}
        </div>

        <div className="sap-mod-button-container mt-6">
          <button
            className="sap-mod-button"
            onClick={handleDownloadBrochureClick}
          >
            Download Brochure
          </button>

          {/* Replace the image with a video */}
          <video
            src={data.videoUrl} // Change this to the appropriate video URL key in your JSON
            className="download-video"
            autoPlay
            loop
            muted
          />
        </div>
      </div>

      {showPopupForm && (
        <>
          <div className="contact-form-overlay-sapmod"></div> {/* Overlay */}
          <div className="contact-form-modal-sapmod">
            {' '}
            {/* Modal popup */}
            <ContactForm onSubmit={handleFormSubmit} />
          </div>
        </>
      )}

      <div className="sap-mod-card sap-mod-card-secondary">
        <h3 className="text-xl font-semibold mb-6">{data.overview.title}</h3>
        <div className="space-y-4">
          {data.overview.modules && data.overview.modules.length > 0 ? (
            data.overview.modules.map((module, index) => (
              <div
                key={index}
                className={`sap-mod-card-content ${index % 2 === 1 ? 'alt' : ''}`}
              >
                <span className="text-lg">{module.name}</span>
                <span className="text-sm text-gray-600">{module.duration}</span>
              </div>
            ))
          ) : (
            <p>No modules available.</p>
          )}
          <p className="sap-mod-note">
            *Note: To see the complete Modules Click on 'Download Syllabus'
            button
          </p>
        </div>
      </div>

      <div className="sap-mod-note">
        {data.note && (
          <p
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: data.note.replace(/\n/g, '<br/>'),
            }}
          />
        )}
      </div>
    </div>
  )
}

export default SapModComponent
