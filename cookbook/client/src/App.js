import image from './images/image.png';
import './App.css';

function App() {
    return (
        <div className="App">

            <h1>Nadpis 1</h1>

            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec quis nibh at felis congue commodo. Lorem
                ipsum dolor sit amet, consectetuer adipiscing elit. Proin mattis lacinia justo. Nullam sit amet magna in
                magna
                gravida vehicula. Nullam dapibus fermentum ipsum. Aenean placerat. Integer vulputate sem a nibh rutrum
                consequat. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi
                sed
                libero. Integer in sapien.</p>

            <img src={image} alt="image"/>


            <div>
                <h2>Nadpis 2</h2>


                <table>
                    <thead>
                    <tr>
                        <th>Jméno</th>
                        <th>Věk</th>
                        <th>Město</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Jan Novák</td>
                        <td>30</td>
                        <td>Praha</td>
                    </tr>
                    <tr>
                        <td>Petra Svobodová</td>
                        <td>25</td>
                        <td>Brno</td>
                    </tr>
                    <tr>
                        <td>Karel Dvořák</td>
                        <td>45</td>
                        <td>Ostrava</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <span>Test span</span>


        </div>
    );
}

export default App;
