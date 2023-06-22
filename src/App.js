import { Routes, Route ,BrowserRouter} from "react-router-dom";
import ImageLocalization from "./page/image-localization/image-localization";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<ImageLocalization/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;

