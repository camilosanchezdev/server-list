import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from "react-redux";
import logo from 'assets/logos/logo-home.svg'
import googleIcon from 'assets/icons/google.svg'
import nordWl from 'assets/logos/nordwl.svg'
import bgHome from 'assets/img/bg-home.png'
import spinner from 'assets/img/spinner.gif'
import { authenticate } from '../utils/api/auth.service';
import { login } from '../state/auth.slice';

const Home = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch();

    const [body, setBody] = useState({
        username: '',
        password: ''
    })
    const handleLogin = async (e: FormEvent) => {
        e.preventDefault()
        setError(false)
        setIsLoading(true)
        try {
            const result = await authenticate({ username: body.username, password: body.password });
            setIsLoading(false)
            dispatch(login(result?.data));
        } catch {
            setError(true)
            setIsLoading(false)
        }

    }
    return (
        <div className="flex min-h-screen">
            <div className=" w-1/2 text-white hidden md:flex justify-center bg-primary bg-cover" style={{ backgroundImage: `url(${bgHome})` }}>
                <div className="flex justify-center items-center h-full w-2/3">
                    <div className="flex flex-col items-center">
                        <div className="w-64 h-64 flex justify-center items-center">
                            <img src={nordWl} alt="" className=" bg-white rounded-full w-60 h-60 object-contain p-4 shadow-xl" />
                        </div>
                        <h2 className="font-bold text-3xl mt-3">Servers</h2>
                        <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quaerat temporibus.</p>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="w-2/3">
                        <img src={logo} alt="" className="w-20 h-20 m-auto bg-gray-100 border rounded-full my-5" />
                        <h1 className="text-3xl text-center font-semibold mb-3">Hello again!</h1>
                        <p className="text-center">Enter your credentials to access your account.</p>
                    </div>

                </div>
                <div className="flex flex-col items-center">
                    <form className="flex flex-col w-2/3 m-3" onSubmit={(e: FormEvent) => handleLogin(e)}>
                        <div className="my-2">
                            <input type="text" name="username" placeholder="Username" className="form-control p-3 at-icon" value={body.username} onChange={(e: ChangeEvent<HTMLInputElement>) => setBody({ ...body, username: e.target.value })} />
                        </div>
                        <div className="my-2">
                            <input id="test1" type="password" name="password" placeholder="Password" className="form-control p-3 lock-icon" onChange={(e: ChangeEvent<HTMLInputElement>) => setBody({ ...body, password: e.target.value })} value={body.password} />
                        </div>
                        {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <span className="font-medium w-full">Wrong Credentials.</span> Invalid username or password.
                        </div>}
                        <div className="text-center my-3">
                            <button data-testid="loginbtn" disabled={isLoading || body.username === '' || body.password === ''} type="submit" className="rounded-lg disabled:bg-blue-300 w-full p-3 text-white font-semibold hover:bg-blue-700 flex justify-center bg-primary">
                                {isLoading ? <img className="w-6 h-6" src={spinner} alt="" /> : <span>Login</span>}
                            </button>
                        </div>
                        <div className="text-center my-3">
                            <button type="button" className="rounded-lg bg-white border border-gray-200 w-full p-3 flex items-center justify-center font-semibold text-gray-600 cursor-pointer">
                                <img src={googleIcon} alt="" className="w-8 h-8 mr-3" />
                                Sign in with Google</button>
                        </div>
                    </form>
                    <div>
                        <p>Don't have an account yet? <span className="text-primary font-semibold cursor-pointer">Sign Up</span></p>
                    </div>
                </div>

            </div >
        </div >
    );
};

export default Home;
