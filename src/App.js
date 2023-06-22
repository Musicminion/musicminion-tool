import { Routes, Route ,BrowserRouter} from "react-router-dom";
import ImageLocalization from "./page/image-localization/image-localization";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ImageLocalization/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;

