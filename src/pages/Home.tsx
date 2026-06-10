import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import OddsTable from "@/components/OddsTable";

export default function Home() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="h-[calc(100vh-56px)] bg-[#3a3f47]"
      >
        <OddsTable />
      </motion.div>
    </Layout>
  );
}
