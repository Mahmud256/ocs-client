import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';  // Add this import

const Signup = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();  // Use react-hook-form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');

  const handleSignup = async (data) => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setPasswordValidationMessage('Passwords do not match');
      return; // Don't proceed with signup if passwords don't match
    } else {
      setPasswordsMatch(true);
      setPasswordValidationMessage('Passwords match');
      try {
        const result = await createUser(email, password);
        const loggedUser = result.user;
        console.log("Name:", loggedUser);
        const displayName = `${firstName} ${lastName}`;

        // Update user profile with display name
        await updateProfile(loggedUser, {
          displayName: displayName
        })

        const userInfo = {
          email: loggedUser?.email,
          name: loggedUser?.displayName,
          role: data.role  // Add the role to the userInfo
        };
        
        axiosPublic.post('/users', userInfo)
          .then(res => {
            if (res.data.insertedId) {
              console.log('User added to the database');
              navigate(location?.state ? location.state : '/');
            }
          })
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-9">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your OCS Account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignup)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none my-1 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none my-1 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none my-1 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* ROLE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                {...register("role", { required: "Role is required" })}  // Correctly register the field
                className="select select-bordered w-full max-w-xs"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none my-1 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none my-1 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordsMatch(e.target.value === password);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Password validation message */}
        {passwordValidationMessage && (
          <p className={passwordsMatch ? "text-green-500 text-sm" : "text-red-500 text-sm"}>{passwordValidationMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Signup;
