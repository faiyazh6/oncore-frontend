import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from '../components/Authentication/LogoutButton';

const tabs = [
  { name: 'Infusion Center Settings', href: '#infusion', current: true },
  { name: 'Personal Settings', href: '#personal', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Settings() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [formValues, setFormValues] = useState({
    infusionOpenTime: '',
    infusionCloseTime: '',
    numberOfChairs: '',
    suggestedBreakDuration: '',
    lunchBreakStartTime: '',
    lunchBreakEndTime: '',
    patientNurseRatio: '',
  });

  const [accountSettings, setAccountSettings] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    profilePicture: '',
  });

  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [userMetadata, setUserMetadata] = useState(null);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate('/error');
      return;
    }

    const loadSettings = async () => {
      fetch('http://localhost:4000/api/settings')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const settings = data.payload;
          setFormValues({
            infusionOpenTime: settings.openTime != null ? settings.openTime.toString() : '',
            infusionCloseTime: settings.closeTime != null ? settings.closeTime.toString() : '',
            numberOfChairs: settings.numberOfChairs != null ? settings.numberOfChairs.toString() : '',
            suggestedBreakDuration: settings.break_duration != null ? settings.break_duration.toString() : '',
            lunchBreakStartTime: settings.break_start_time != null ? settings.break_start_time.toString() : '',
            lunchBreakEndTime: settings.break_end_time != null ? settings.break_end_time.toString() : '',
            patientNurseRatio: settings.patientNurseRatio != null ? settings.patientNurseRatio.toString() : '',
          });

          if (isAuthenticated) {
            setAccountSettings({
              firstName: user.given_name || '',
              lastName: user.family_name || '',
              email: user.email || '',
              role: user.email || '', //change user.email to metadata?.description 
              profilePicture: user.picture || 'https://via.placeholder.com/150',
            });
            setSelectedRole(user.email || ''); //change user.email to metadata?.description 
          }
        })
        .catch((error) => {
          console.error('Error fetching settings:', error);
          navigate('/error');
        });
    };

    loadSettings();
  }, [isLoading, isAuthenticated, navigate, user]);

  useEffect(() => {
    const hash = location.hash;

    if (hash === '#personal') {
      tabs.forEach((tab) => (tab.current = tab.name === 'Personal Settings'));
    } else {
      tabs.forEach((tab) => (tab.current = tab.name === 'Infusion Center Settings'));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('openTime', formValues.infusionOpenTime);
    formData.append('closeTime', formValues.infusionCloseTime);
    formData.append('numberOfChairs', parseInt(formValues.numberOfChairs, 10));
    formData.append('break_duration', parseInt(formValues.suggestedBreakDuration, 10));
    formData.append('break_start_time', formValues.lunchBreakStartTime);
    formData.append('break_end_time', formValues.lunchBreakEndTime);
    formData.append('patientNurseRatio', parseInt(formValues.patientNurseRatio, 10));

    console.log('FormData Values:', Array.from(formData.entries()));

    fetch('http://localhost:4000/api/settings', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);
      })
      .catch((error) => {
        console.error('Error updating settings:', error);
      });
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="lg:pl-64">
        <div className="lg:px-8">
          <div className="flex flex-col lg:max-w-4xl mx-auto">
            <main className="flex-1">
              <div className="relative mx-auto max-w-4xl">
                <div className="pb-4 pt-10">
                  <div className="px-4 sm:px-6 lg:px-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>Settings</h1>
                  </div>
                  <div className="px-4 sm:px-6 lg:px-0">
                    <div className="py-6">
                      {/* Tabs */}
                      <div className="lg:hidden">
                        <label htmlFor="selected-tab" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="selected-tab"
                          name="selected-tab"
                          className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6"
                          defaultValue={tabs.find((tab) => tab.current).name}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden lg:block">
                        <div className="border-b border-gray-200">
                          <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                              <a
                                key={tab.name}
                                href={tab.href}
                                onClick={() => {
                                  tabs.forEach((t) => (t.current = t.name === tab.name));
                                  setFormValues({ ...formValues });
                                }}
                                className={classNames(
                                  tab.current ? 'border-[#222E93] text-[#222E93]' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                  'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                                )}
                              >
                                {tab.name}
                              </a>
                            ))}
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-1 lg:col-span-3"></div> {/* Empty left column */}
                  <div className="col-span-10 lg:col-span-6 mx-auto">
                    {/* Description list with inline editing */}
                    {tabs[0].current && (
                      <div className="mt-10">
                        <div className="mt-6">
                          <form onSubmit={handleSave}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <div className="col-span-1 sm:col-span-1">
                                <label htmlFor="infusionOpenTime" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                  Open Time
                                </label>
                                <input
                                  type="text"
                                  name="infusionOpenTime"
                                  id="infusionOpenTime"
                                  value={formValues.infusionOpenTime}
                                  onChange={handleChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-1 sm:col-span-1">
                                <label htmlFor="infusionCloseTime" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                  Close Time
                                </label>
                                <input
                                  type="text"
                                  name="infusionCloseTime"
                                  id="infusionCloseTime"
                                  value={formValues.infusionCloseTime}
                                  onChange={handleChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-2 sm:col-span-2">
                                <label htmlFor="numberOfChairs" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                  Number of Chairs
                                </label>
                                <input
                                  type="text"
                                  name="numberOfChairs"
                                  id="numberOfChairs"
                                  value={formValues.numberOfChairs}
                                  onChange={handleChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-2 sm:col-span-2">
                                <label htmlFor="suggestedBreakDuration" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                  Suggested Break Duration
                                </label>
                                <input
                                  type="text"
                                  name="suggestedBreakDuration"
                                  id="suggestedBreakDuration"
                                  value={formValues.suggestedBreakDuration}
                                  onChange={handleChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-1 sm:col-span-1">
                                <label htmlFor="lunchBreakStartTime" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                  Lunch Break - Start Time
                                </label>
                                <input
                                  type="text"
                                  name="lunchBreakStartTime"
                                  id="lunchBreakStartTime"
                                  value={formValues.lunchBreakStartTime}
                                  onChange={handleChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-1 sm:col-span-1">
                                <label htmlFor="lunchBreakEndTime" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                  Lunch Break - End Time
                                </label>
                                <input
                                  type="text"
                                  name="lunchBreakEndTime"
                                  id="lunchBreakEndTime"
                                  value={formValues.lunchBreakEndTime}
                                  onChange={handleChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div className="col-span-2 sm:col-span-2">
                                <label htmlFor="patientNurseRatio" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                  Required Patient-Nurse Ratio
                                </label>
                                <input
                                  type="text"
                                  name="patientNurseRatio"
                                  id="patientNurseRatio"
                                  value={formValues.patientNurseRatio}
                                  onChange={handleChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div className="mt-8 flex justify-center">
                              <button
                                type="submit"
                                className="rounded-md bg-[#222E93] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1C2675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222E93]"
                              >
                                Update
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}

                    {tabs[1].current && (
                      <div className="mt-10">
                        <div className="mt-6">
                          <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6">
                              <div className="col-span-1 flex flex-col items-center">
                                <img
                                  className="h-24 w-24 rounded-full"
                                  src={accountSettings.profilePicture}
                                  alt="Profile"
                                />
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="col-span-1">
                                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={accountSettings.firstName}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                    Last Name
                                  </label>
                                  <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={accountSettings.lastName}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label htmlFor="role" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                    Role
                                  </label>
                                  <select
                                    name="role"
                                    id="role"
                                    value={selectedRole}
                                    onChange={handleRoleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  >
                                    <option value="Executive">Executive</option>
                                    <option value="Floor Nurse">Floor Nurse</option>
                                    <option value="Charge Nurse">Charge Nurse</option>
                                  </select>
                                </div>
                                <div className="col-span-2">
                                  <label htmlFor="email" className="block text-sm font-medium text-gray-700" style={{ fontFamily: 'Manrope', color: '#4A4A4A' }}>
                                    Email
                                  </label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={accountSettings.email}
                                    readOnly
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-8 flex justify-center space-x-10">
                              <button
                                type="submit"
                                className="rounded-md bg-[#222E93] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1C2675] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222E93]"
                              >
                                Update
                              </button>
                              <LogoutButton className="rounded-md bg-acuityHigh px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500" />
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 lg:col-span-3"></div> {/* Empty right column */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;