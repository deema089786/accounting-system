import { useState, useEffect } from 'react';
import * as api from '../../services/api';
import { API } from '../../types';

export interface UseUserHook {
  user: API.User | null;
  loading: boolean;
}

const useUser = (): UseUserHook => {
  const [user, setUser] = useState<API.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const exec = async () => {
      try {
        setLoading(true);
        const { data } = await api.users.getUser();
        setUser(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    exec().catch(e => console.error(e));
  }, []);
  return {
    user,
    loading,
  };
};

export default useUser;
