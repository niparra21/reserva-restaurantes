const express = require('express');
const { registerUser , loginUser, getUser, updateUser, deleteUser, registerMenu, getMenu, updateMenu, deleteMenu, getOrder } = require('./Controller');
const { authenticateJWT, isAdmin, canEdit, canSeeOrder } = require('./Middleware');

const router = express.Router();

router.post('/auth/register', registerUser );
router.post('/auth/login', loginUser );
// Add other routes for users, restaurants, menus, reservations, and orders.

// CRUD de usuarios
router.get('/users/me', authenticateJWT, getUser);
router.put('/users/:id', authenticateJWT, canEdit, updateUser);
router.delete('/users/:id', authenticateJWT, canEdit, deleteUser);

// CRUD de menu
router.post('/menus', authenticateJWT, isAdmin, registerMenu);
router.get('/menus/:id', authenticateJWT, getMenu);
router.put('/menus/:id', authenticateJWT, isAdmin, updateMenu);
router.delete('/menus/:id', authenticateJWT, isAdmin, deleteMenu);

// CRUD de pedido

router.get('/orders/:id', authenticateJWT, canSeeOrder, getOrder);
router.post('/orders', (req, res) => {
    try{
        const { restaurantId, customerName, items } = req.body;
        const newOrder = { id: orders.length + 1, restaurantId, customerName, items };
        orders.push(newOrder);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error en orden', error });
        }
  });

//Restaurant
router.post('/restaurants', isAdmin, (req, res) => {
    try{
        const { name, location, cuisine } = req.body;
        const newRestaurant = { id: restaurants.length + 1, name, location, cuisine };
        restaurants.push(newRestaurant);
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: 'Error en restaurante', error });
        }
  });

router.get('/restaurants', (req, res) => {
    res.status(200).json(restaurants);
  });

//Reservations
router.post('/reservations', (req, res) => {
    try{
        const { restaurantId, customerName, date, time, guests } = req.body;
        const newReservation = { id: reservations.length + 1, restaurantId, customerName, date, time, guests };
        reservations.push(newReservation);
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ message: 'Error en reserva', error });
        }
  });

router.delete('/reservations/:id', (req, res) => {
    try{
        const { id } = req.params;
        reservations = reservations.filter(reservation => reservation.id !== parseInt(id));
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error borrando reserva', error });
        }
  });

module.exports = router;