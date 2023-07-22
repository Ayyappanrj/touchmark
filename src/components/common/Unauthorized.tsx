import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate('/dashboard');

    return (
        <section className="browser-center">
            <h3>Unauthorized</h3>
            <p>You do not have access to the requested page.</p>
            <div>
                <Button variant="outlined" onClick={goBack}>
                    Go Dashboard
                </Button>
            </div>
        </section>
    )
}

export default Unauthorized;