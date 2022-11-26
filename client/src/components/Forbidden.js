import {Link} from 'react-router-dom';

const Forbidden = () =>{
    return (
        <main>
            <div className="wrap--forbidden" >
                <h1>Forbidden</h1>
                <span>Oh oh! You can't access this page...=[</span>
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

export default Forbidden