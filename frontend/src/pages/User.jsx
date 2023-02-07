import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { updatePassword } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const User = () => {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState({
    password: "",
    password2: "",
  });
  const [err, setErr] = useState({ is: false, msg: "" });
  const [succ, setSucc] = useState({ is: false, msg: "" });
  const [pass, setPass] = useState(false);
  const [pass2, setPass2] = useState(false);
  const { password, password2 } = update;
  const { user, isLoading: isLoadingUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePass = () => {
    setPass(!pass);
  };

  const togglePass2 = () => {
    setPass2(!pass2);
  };

  const onShow = () => {
    setShow(!show);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErr({ is: true, msg: "Passwords doesn't match!" });
      setTimeout(() => {
        setErr({ is: false, msg: "" });
      }, 3000);
    }

    const info = {
      userId: user.id,
      passwords: {
        password: password,
        password2: password2,
      },
    };

    const action = await dispatch(updatePassword(info));
    if (action.payload?.check) {
      setShow(false);
      setSucc({ is: true, msg: "Password update successfully!" });
      setTimeout(() => {
        setSucc({ is: false, msg: "" });
      }, 3000);
    }
  };

  if (isLoadingUser) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <section className='heading'>
        <h1>
          <span className='user-info'>{user.first_name}'s</span> Section
        </h1>
      </section>
      <section className='content'>
        <section className='heading'>
          <p>This is your personal info:</p>
        </section>
        <div className='profile'>
          <p>
            First name: {""}
            <span className='bold'>{user.first_name}</span>
          </p>
          <p>
            Last name: <span className='bold'>{user.last_name}</span>
          </p>{" "}
          <p>
            Email: <span className='bold uncapitalize'>{user.email}</span>
          </p>
        </div>
        <div className='change-butt'>
          <button onClick={onShow}>Change Password</button>
        </div>
        <section className='heading'>{succ.is && <p>{succ.msg}</p>}</section>
        {show && (
          <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                {/* <p>Write your new password</p> */}
                <div className='show-pass'>
                  <input
                    type={pass ? "text" : "password"}
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    placeholder='Enter your new password'
                    onChange={onChange}
                  />
                  <button type='button' onClick={togglePass}>
                    {!pass ? <ImEye /> : <ImEyeBlocked />}
                  </button>
                </div>
              </div>
              <div className='form-group'>
                <div className='show-pass'>
                  <input
                    type={pass2 ? "text" : "password"}
                    className='form-control'
                    id='password2'
                    name='password2'
                    value={password2}
                    placeholder='Confirm your password'
                    onChange={onChange}
                  />
                  <button type='button' onClick={togglePass2}>
                    {!pass2 ? <ImEye /> : <ImEyeBlocked />}
                  </button>
                </div>
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-block'>
                  Update Password
                </button>
              </div>
              <section className='heading'>
                {err.is && <p>{err.msg}</p>}
              </section>
            </form>
          </section>
        )}
      </section>
    </div>
  );
};

export default User;
