import { useEffect, useState } from "react";
// tạo custom hook request API để dễ đang tái sử dụng
function useHttp(url, check) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState(null);
  // thự hiện yêu cầu request API
  useEffect(() => {
    let isMounted = true;
    const test = async () => {
      if (check) {
        const res = await fetch(`http://localhost:5000/api/movies${url}`);
        const data = await res.json();
        try {
          setMovies(data);
          setIsLoading(false);
          setError(null);
        } catch (error) {
          setError(error);
          setMovies(null);
          setIsLoading(false);
        }
      } else {
        const res = await fetch(`https://api.themoviedb.org/3${url}`);
        const data = await res.json();
        try {
          data.check = true;
          setMovies(data);
          setIsLoading(false);
          setError(null);
        } catch (error) {
          setError(error);
          setMovies(null);
          setIsLoading(false);
        }
      }
    };
    test();
    return () => {
      isMounted = false;
    };
  }, []);
  // trả về 1 object chứa 3 dữ liệu cần thiết
  return { isLoading, error, movies };
}
export default useHttp;
