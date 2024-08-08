import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    const roleId = selectedRole;
    
    if (roleId) {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_API_IDENTIFIER,
            scope: "read:current_user create:current_user_metadata update:current_user_metadata",
          },
          cacheMode: 'off',
        });

        const response = await fetch(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Replace with your API access token
          },
          body: JSON.stringify({ user_metadata: {"description": roleId} })
        });
        
        if (response.ok) {
          console.log('Role assigned successfully');
          navigate('/');
        } else {
          console.error('Failed to assign role');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (

    <div>
      <div className="lg:pl-64">
        <div className="my-5 flex h-16 shrink-0 items-center justify-between bg-white px-4 sm:px-6 lg:px-8">
          <h1 className="font-bold text-4xl font-manrope text-custom-blue">Select Your Role</h1>
        </div>
        <div className="bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Executive"
                  name="role"
                  value="Executive"
                  checked={selectedRole === 'Executive'}
                  onChange={handleRoleChange}
                  className="form-radio text-customBlue"
                />
                <label htmlFor="Executive" className="ml-2 text-gray-700">
                  Executive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Floor Nurse"
                  name="role"
                  value="Floor Nurse"
                  checked={selectedRole === 'Floor Nurse'}
                  onChange={handleRoleChange}
                  className="form-radio text-customBlue"
                />
                <label htmlFor="Floor Nurse" className="ml-2 text-gray-700">
                  Floor Nurse
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Charge Nurse"
                  name="role"
                  value="Charge Nurse"
                  checked={selectedRole === 'Charge Nurse'}
                  onChange={handleRoleChange}
                  className="form-radio text-customBlue"
                />
                <label htmlFor="Charge Nurse" className="ml-2 text-gray-700">
                  Charge Nurse
                </label>
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-customBlue text-white rounded hover:bg-customBlue-dark"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
