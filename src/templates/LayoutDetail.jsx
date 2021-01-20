import React from 'react'

const LayoutDetail = () => {
    return (
        <main>
            <h1>TopImageArea-------------------------1</h1>
            <div className="l-container">
                <section className="l-section">
                    <h3>投稿タイトル＠ステージ名</h3>
                </section>
                <section className="l-section">
                    <h3>トップイメージ</h3>
                </section>
            </div>
            <h1>PostArea--------------------------2</h1>
            <div className="l-container">
                <section className="l-section">
                    <h3>ステージ番号　投稿番号</h3>
                    <h3>ステージ名</h3>
                </section>
                <section className="l-section">
                    <h3>投稿画像１</h3>
                    <h3>投稿画像Ⅹ</h3>
                </section>
                <section className="l-section">
                    <h3>投稿記事</h3>
                </section>
            </div>
            <h1>LocationArea--------------------------3</h1>
            <div className="l-container">
                <section className="l-section">
                    <h3>ロケーション名称</h3>
                    <h3>ロケーション住所</h3>
                </section>
                <section className="l-section">
                    <h3>google map</h3>
                </section>
                <section className="l-section">
                    <h3>google earth</h3>
                </section>
            </div>

            <h1>ResentArea--------------------------4</h1>
            <div className="l-container">
                <section className="l-section">
                <h3>関連記事</h3>
                </section>
            </div>
            <h1>SNSArea--------------------------5</h1>
            <div className="l-container">
                <section className="l-section">
                <h3>SNS</h3>
                </section>
            </div>
            <h1>StageListArea--------------------------6</h1>
            <div className="l-container">
                <section className="l-section">
                <h3>ステージリスト</h3>
                </section>
            </div>
            
        </main>
    )
}

export default LayoutDetail
