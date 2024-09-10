import React, { createContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { fetchProfile, adminLogin, logoutAdmin, loginDoctor } from '../lib/apis';

const AdminContext = createContext({
    loginAdminMutation: null,
    loginDoctorMutation: null,
    user: null,
    logoutMutation: null
});

export const AdminContextProvider = (props) => {

    const { data: adminProfile, mutate: fetchAdminProfile } = useMutation(fetchProfile);
    const loginAdminMutation = useMutation(adminLogin, {
        onSuccess: () => {
            fetchAdminProfile();
        }
    });
    const loginDoctorMutation = useMutation(loginDoctor, {
        onSuccess: () => {
            fetchAdminProfile();
        }
    });
    const logoutMutation = useMutation(logoutAdmin, {
        onSuccess: () => {
            fetchAdminProfile();
        }
    });

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    const context = {
        loginAdminMutation,
        loginDoctorMutation,
        admin: adminProfile,
        logoutMutation
    };

    return (
        <AdminContext.Provider value={context}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContext;
