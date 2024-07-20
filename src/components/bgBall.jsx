import '../styles/_bgGradient.scss'

function BackgroundBall() {
    return ( <>
        <article className="glow-container z-1">
            <h2 className="hidden">backgroud</h2>
            <div className="ball"></div>
            <div className="ball" style={{ '--delay': '-12s', '--size': '0.35', '--speed': '25s', animationDelay: 'var(--delay)' }}></div>
        <div className="ball" style={{ '--delay': '-10s', '--size': '0.3', '--speed': '15s', animationDelay: 'var(--delay)' }}></div>

        </article>
    </> );
}

export default BackgroundBall;