import '../styles/_loading.scss'
import BackgroundBall from './bgBall';

function Loading() {
    return ( <>
        <BackgroundBall />
        <div className="page ">
            <div className="loading-blurbs">
                <code className="python">
                print("<strong>Loading...</strong>")
            </code>
                <code className="typescript">
                console.log("<strong>Loading...</strong>")
            </code>
                <code className="ruby">
                puts "<strong>Loading...</strong>"
            </code>
                <code className="csharp">System.Console.WriteLine("<strong>Loading...</strong>");
            </code>
                <code className="cplusplus">
                std::cout &lt;&lt; "<strong>Loading...</strong>" &lt;&lt; std::endl;
            </code>
                <code className="java">
                System.out.println("<strong>Loading...</strong>");
            </code>
                <code className="swift">
                println("<strong>Loading...</strong>")
            </code>
                <code className="php">
                echo "<strong>Loading...</strong>"
            </code>
            </div>
        </div>
    </> );
}

export default Loading;