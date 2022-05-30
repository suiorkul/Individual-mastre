import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import ContextProvider from "./components/contexts/ContextProvider";
import MyRoutes from "./components/MyRoutes";
import ReviewContext from "./components/contexts/ReviewContext";
import AuthContextProvider from "./components/contexts/AuthContextProvider";
import CartContextProvider from "./components/contexts/CartContextProvider";
import ComContextProvider from "./components/contexts/ComContextProvider";
import FavoriteContextProvider from "./components/contexts/FavoriteContextProvider";
import LikeContextProvider from "./components/contexts/LikeContextProvider";

function App() {
  AOS.init({
    duration: 800,
  });

  return (
    <div className="App">
      <AuthContextProvider>
        <ComContextProvider>
          <ReviewContext>
            <FavoriteContextProvider>
              <CartContextProvider>
                <LikeContextProvider>
                  <ContextProvider>
                    <MyRoutes />
                  </ContextProvider>
                </LikeContextProvider>
              </CartContextProvider>
            </FavoriteContextProvider>
          </ReviewContext>
        </ComContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
