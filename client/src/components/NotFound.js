import {Link} from 'react-router-dom';

const NotFound = () =>{
    return (
        <main>
            <div className="wrap--forbidden" >
                <h1>Not Found</h1>
                <span>Oh oh! that page could not be found...=[</span>
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

export default NotFound