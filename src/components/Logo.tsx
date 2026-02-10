import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center space-x-2">
      <div>
        <div className="text-2xl tracking-wider font-bold bg-linear-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-transform">
          MOVIEFLIX
        </div>
      </div>
    </Link>
  );
};

export default Logo;
