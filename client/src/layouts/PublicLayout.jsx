import Navbar from "../components/navbar";
import Footer from "../components/footer";

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