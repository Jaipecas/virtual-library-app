
export const apiGet = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors.join(", "));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const apiPost = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors.join(", "));
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const apiDelete = async (url) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.errors.join(", "));
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const apiPut = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors.join(", "));
    }

    return data;
  } catch (error) {
    throw error;
  }
};


