import '../styles/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__grid">
                <div className="footer__col">
                    <h4>STORE</h4>
                    <ul>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Press</li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4>HELP</h4>
                    <ul>
                        <li>FAQ</li>
                        <li>Shipping Info</li>
                        <li>Returns</li>
                    </ul>
                </div>
                <div className="footer__col">
                    <h4>CONTACT</h4>
                    <ul>
                        <li>support@store.com</li>
                        <li>1-800-STORE</li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                <p>© 2024 STORE. All rights reserved.</p>
            </div>
        </footer>
    );
}