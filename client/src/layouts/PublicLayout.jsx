import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

function PublicLayout({ children }) {
    return (
        <>
            <Navbar />

            {children}

            <Footer />
        </>
    );
}

export default PublicLayout;