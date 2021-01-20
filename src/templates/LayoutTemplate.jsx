import React from 'react'

const LayoutTemplate = () => {
    return (
        <main>
            <div className="l-container-fluid">
                container-fluid
            </div>
            <div className="l-container">
                container
            </div>
            <div className="l-container">
                <section className="l-section">
                    section
                </section>
            </div>
            <div className="l-container">
                <div className="l-row">
                    <div>item1</div>
                    <div>item2</div>
                    <div>item3</div>
               </div>
                <div className="l-column">
                    <div>item1</div>
                    <div>item2</div>
                    <div>item3</div>
               </div>
            </div>
        </main>
    )
}

export default LayoutTemplate
