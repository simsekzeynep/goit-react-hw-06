import { useDispatch } from "react-redux";
import { FaPhone, FaUser } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsSlice.js";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const { id, name, number } = contact;
  const phoneHref = `tel:${number.replace(/[^\d+]/g, "")}`;

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <li className={css.card}>
      <div className={css.info}>
        <p className={css.row}>
          <FaUser className={css.icon} aria-hidden="true" />
          <span className={css.text}>{name}</span>
        </p>
        <p className={css.row}>
          <FaPhone className={css.icon} aria-hidden="true" />
          <a className={css.phone} href={phoneHref}>
            {number}
          </a>
        </p>
      </div>
      <button
        className={css.button}
        type="button"
        onClick={handleDelete}
        aria-label={`Delete ${name}`}
      >
        Delete
      </button>
    </li>
  );
}
