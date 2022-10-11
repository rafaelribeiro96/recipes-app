import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../component/Footer';
import context from '../contexts/ContextRecipe';
import Header from '../component/Header';
import './Profile.css';
import voevo from '../images/logovoevo.png';

export default function Profile() {
  const { setTitle, setShowHeaderButtons } = useContext(context);
  useEffect(() => {
    setShowHeaderButtons({
      profile: true,
      search: false,
    });
    setTitle('Profile');
  }, []);
  const history = useHistory();
  const { email } = (localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')) : '';
  const userLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <Header />
      <div className="page-profile-content">
        <img
          src={ voevo }
          alt="Logo Vô e Vó seu app de receitas caseiras"
          className="logo-app-profile"
        />
        <div>
          <h3> PROFILE</h3>
        </div>

        <div data-testid="profile-email">{ email }</div>

        <section className="section-profile-button">
          <button
            data-testid="profile-done-btn"
            type="button"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>

          <button
            data-testid="profile-favorite-btn"
            type="button"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>

          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={ () => userLogout() }
          >
            Logout
          </button>
        </section>
      </div>
      <Footer />

    </main>
  );
}
