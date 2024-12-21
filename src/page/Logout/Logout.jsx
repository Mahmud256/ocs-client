import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';


const Logout = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [isSeller] = useSeller();

    const handleLogout = () => {
        logOut().then(() => {
            console.log("LogOut");
        })
            .catch(error => {
                console.log('Error', error);
            })
    }

    return (
        <div className="group relative">
            <div className='flex items-center group-hover:bg-gray-200 group-hover:rounded-box cursor-pointer'>
                <li className="mt-2 p-2 space-y-2">
                <h2 className="user-name">{user.displayName}</h2>
                    {user && isAdmin && <Link to="/profile/adminHome"><h2 className="user-name">Profile</h2></Link>}
                    {user && isSeller && !isAdmin && <Link to="/profile/sellerHome"><h2 className="user-name">Profile</h2></Link>}
                    {user && !isSeller && !isAdmin && <Link to="/profile/userHome"><h2 className="user-name">Profile</h2></Link>}
                    <h1 onClick={handleLogout} className="w-full text-center font-bold hover:text-red-500">Logout</h1>
                </li>
            </div>
        </div>
    );
}

export default Logout;
