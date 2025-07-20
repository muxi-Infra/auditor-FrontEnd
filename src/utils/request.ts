import useUserStore from '@/stores/user';

interface RequestOptions {
  headers?: HeadersInit;
  params?: Record<string, string>;
}

interface PostOptions extends RequestOptions {
  body: Record<string, unknown>;
}

interface Response<T> {
  code: number;
  data: T;
  msg: string;
}

/**
 * Add query parameters to URL
 */
function addQueryParams(url: string, params?: Record<string, string>): string {
  if (!params) return url;
  const queryString = new URLSearchParams(params).toString();
  return `${url}${url.includes('?') ? '&' : '?'}${queryString}`;
}

/**
 * Wrapper for HTTP GET requests
 */
async function get<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = addQueryParams(path, options.params);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    return (apiResponse as Response<T>).data;
  } catch (error) {
    console.error(`GET request to ${url} failed:`, error);
    throw error;
  }
}

/**
 * Wrapper for HTTP POST requests
 */
async function post<T>(path: string, options: PostOptions): Promise<T> {
  const url = addQueryParams(path, options.params);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(options.body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    return (apiResponse as Response<T>).data;
  } catch (error) {
    console.error(`POST request to ${url} failed:`, error);
    throw error;
  }
}

async function del<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = addQueryParams(path, options.params);
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    return (apiResponse as Response<T>).data;
  } catch (error) {
    console.error(`DEL request to ${url} failed:`, error);
    throw error;
  }
}


async function put<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const url = addQueryParams(path, options.params);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
   
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    return (apiResponse as Response<T>).data;
  } catch (error) {
    console.error(`PUT request to ${url} failed:`, error);
    throw error;
  }
}
/**
 * Wrapper for HTTP GET requests with authentication
 */
async function getWithAuth<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = useUserStore.getState().getToken();

  try {
    return await get<T>(path, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Authenticated GET request to ${path} failed:`, error);
    throw error;
  }
}

async function delWithAuth<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const token = useUserStore.getState().getToken();

  try {
    
    return await del<T>(path, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Authenticated DEL request to ${path} failed:`, error);
    throw error;
  }
}
/**
 * Wrapper for HTTP POST requests with authentication
 */
async function postWithAuth<T>(path: string, options: PostOptions): Promise<T> {
  const token = useUserStore.getState().getToken();

  try {
    return await post<T>(path, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(`Authenticated POST request to ${path} failed:`, error);
    throw error;
  }
}


async function putWithAuth<T>(
  path: string,
  options: PostOptions,
  api_key:string,
): Promise<T> {
  const token = useUserStore.getState().getToken();

  try {
    
    return await put<T>(path, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
       api_key:api_key,
      },
    });
  } catch (error) {
    console.error(`Authenticated PUT request to ${path} failed:`, error);
    throw error;
  }
}

export { get, post, getWithAuth, postWithAuth, delWithAuth ,putWithAuth};
