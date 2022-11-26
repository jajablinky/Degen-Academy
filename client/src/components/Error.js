import {Link} from 'react-router-dom';

const Error = () =>{
    return (
        <main>
            <div className="wrap--forbidden" >
                <h1>Error </h1>
                <span>Oh oh! You've stumbled onto an error. Sorry about that!</span>
                <span>     .-""""""-.
                        .'  \\  //  '.
                        /   O      O   \
                        :                :
                        |                | 
                        :       __       :
                        \  .-"`  `"-.  /
                        '.          .'
                            '-......-' 😠  </span>
            </div>
            <div className="wrap--forbidden" >
            <br></br>
                <span><Link to="/"><button className="button button-secondary">Back</button></Link></span>
            </div>
        </main>
    )
}

export default Error